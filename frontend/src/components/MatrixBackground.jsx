import { useEffect, useRef } from "react";

const GLYPHS = "01{}<>/=;:_#$%abcdefxyz";

export default function MatrixBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = 16;
    let w, h, drops, raf, last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#050807";
      ctx.fillRect(0, 0, w, h);
      drops = Array.from({ length: Math.ceil(w / size) }, () => Math.random() * -50);
      if (reduce) draw(true);
    };

    const draw = (once = false) => {
      ctx.fillStyle = once ? "#050807" : "rgba(5,8,7,0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${size - 2}px "Courier New", monospace`;
      drops.forEach((y, i) => {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = Math.random() > 0.97 ? "rgba(134,239,172,0.55)" : "rgba(34,197,94,0.22)";
        ctx.fillText(ch, i * size, (once ? Math.random() * h : y * size));
        if (!once) drops[i] = y * size > h && Math.random() > 0.975 ? 0 : y + 1;
      });
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 70) return;
      last = t;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="matrix" aria-hidden="true" />;
}
