// Small fetch wrapper. The access token lives only in memory (never localStorage);
// the refresh token is an HttpOnly cookie that JavaScript cannot read.

let token = null;
let onLost = () => {};
let inflight = null;

export const setAccessToken = (t) => { token = t; };
export const setAuthLostHandler = (fn) => { onLost = fn; };

export class ApiError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

function send(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const h = { Accept: "application/json", "X-Requested-With": "darksauce", ...headers };
  let payload;
  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    h["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }
  if (auth && token) h.Authorization = `Bearer ${token}`;
  return fetch(path, { method, headers: h, body: payload, credentials: "same-origin" });
}

async function parse(res) {
  if (res.status === 204) return null;
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* not JSON */ }
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data?.error || "error",
      data?.message || "Something went wrong. Please try again.",
      data?.fields,
    );
  }
  return data;
}

// One refresh at a time; everyone who needs it shares the same request.
// `retry` gives a second try after a short wait, which covers two tabs refreshing together.
export function refreshSession(retry = false) {
  if (!inflight) {
    inflight = (async () => {
      for (let i = 0; i < (retry ? 2 : 1); i++) {
        try {
          const res = await send("/api/auth/refresh", { method: "POST", auth: false });
          if (res.ok) return await res.json();
          if (res.status !== 401) return null;
        } catch {
          return null;
        }
        if (retry && i === 0) await new Promise((r) => setTimeout(r, 400));
      }
      return null;
    })().finally(() => { inflight = null; });
  }
  return inflight;
}

export async function api(path, opts = {}) {
  let res = await send(path, opts);
  if (res.status === 401 && opts.auth !== false) {
    const data = await refreshSession(true);
    if (!data) {
      onLost();
      return parse(res);
    }
    token = data.accessToken;
    res = await send(path, opts);
  }
  return parse(res);
}
