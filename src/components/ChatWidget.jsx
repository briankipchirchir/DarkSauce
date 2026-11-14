import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";

const REPLY = "Thanks for your message. An admin will reply here as soon as they are available.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [hint, setHint] = useState(true);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([{ id: 1, from: "them", text: "Hi! How can we help you today?" }]);
  const logRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => { setOpen((o) => !o); setUnread(0); setHint(false); };

  const send = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: t }]);
    setText("");
    clearTimeout(timer.current);
    // TODO: send this to your support backend or websocket
    timer.current = setTimeout(
      () => setMsgs((m) => [...m, { id: Date.now() + 1, from: "them", text: REPLY }]),
      900
    );
  };

  return (
    <>
      {open && (
        <section className="dx-chat" aria-label="Support chat">
          <header>
            <div>
              <strong>Support</strong>
              
              <small>We usually reply within a few hours</small>
            </div>
            <button className="dx-icon-btn" onClick={toggle} aria-label="Close chat"><Icon name="close" size={18} /></button>
          </header>
          <div className="dx-chat-log" ref={logRef} aria-live="polite">
            {msgs.map((m) => (
              <p key={m.id} className={`dx-msg-b ${m.from}`}>{m.text}</p>
            ))}
          </div>
          <form onSubmit={send}>
            <input
              className="dx-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message"
              aria-label="Message"
              maxLength={500}
            />
            <button className="dx-btn primary dx-send" type="submit" aria-label="Send"><Icon name="send" size={18} /></button>
          </form>
        </section>
      )}

      <div className="dx-chat-btn">
        {hint && !open && <span className="dx-chat-hint">We are here!</span>}
        <button className="dx-chat-fab" onClick={toggle} aria-label={open ? "Close chat" : "Open support chat"} aria-expanded={open}>
          <Icon name={open ? "close" : "chat"} size={26} />
          {unread > 0 && !open && <i className="dx-badge">{unread}</i>}
        </button>
      </div>
    </>
  );
}
