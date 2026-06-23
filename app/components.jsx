/* ============================================================
   DriveDraw — shared components
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Scroll reveal hook ---- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current ? ref.current.querySelectorAll(".reveal") : [];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
  return ref;
}

/* ---- Brand mark ---- */
function Logo({ onClick, size = 30 }) {
  return (
    <button onClick={onClick} aria-label="DriveDraw home"
      style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{
        width: size, height: size, position: "relative", flex: "none",
        display: "grid", placeItems: "center",
      }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1px solid var(--line-2)",
        }} />
        <span style={{
          width: size * 0.42, height: 2, background: "var(--accent)",
          boxShadow: "0 0 12px var(--accent-glow)", transform: "translateX(1px)",
        }} />
        <span style={{
          position: "absolute", width: size * 0.16, height: size * 0.16,
          borderRadius: "50%", border: "1px solid var(--text)", right: size * 0.16,
        }} />
      </span>
      <span style={{
        fontFamily: "var(--font)", fontWeight: 800, fontSize: 18,
        letterSpacing: "-0.01em", textTransform: "uppercase",
      }}>Drive<span style={{ color: "var(--accent)" }}>Draw</span></span>
    </button>
  );
}

/* ---- Top navigation ---- */
function Nav({ route, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [route]);

  const links = [
    { id: "home", label: "The Car" },
    { id: "draw", label: "The Draw" },
    { id: "winners", label: "Winners" },
  ];

  const navigate = (id) => {
    setMenuOpen(false);
    go(id);
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.4s var(--ease), border-color 0.4s, backdrop-filter 0.4s",
        background: scrolled || menuOpen ? "oklch(0.145 0.008 260 / 0.82)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px) saturate(1.2)" : "none",
        borderBottom: `1px solid ${scrolled || menuOpen ? "var(--line)" : "transparent"}`,
      }}>
        <div className="wrap" style={{
          height: 76, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Logo onClick={() => navigate("home")} />
          <nav className="nav-links">
            {links.map((l) => (
              <button key={l.id} onClick={() => navigate(l.id)}
                style={{
                  fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.14em",
                  textTransform: "uppercase", padding: "10px 16px", borderRadius: 2, whiteSpace: "nowrap",
                  color: route === l.id ? "var(--text)" : "var(--muted)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = route === l.id ? "var(--text)" : "var(--muted)")}
              >{l.label}</button>
            ))}
            <button className="btn btn--primary" style={{ height: 44, marginLeft: 14, padding: "0 22px" }}
              onClick={() => navigate("entry")}>Enter Now</button>
          </nav>
          <button
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >{menuOpen ? "✕" : "☰"}</button>
        </div>
      </header>

      <div className={`nav-mobile-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        {links.map((l) => (
          <button key={l.id} onClick={() => navigate(l.id)}
            style={{ color: route === l.id ? "var(--text)" : "var(--muted)" }}
          >{l.label}</button>
        ))}
        <button className="btn btn--primary" onClick={() => navigate("entry")}>Enter Now</button>
      </div>
    </>
  );
}

/* ---- Countdown ---- */
function useCountdown(target) {
  const calc = useCallback(() => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  }, [target]);
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}

function Countdown({ target, size = "lg" }) {
  const { d, h, m, s } = useCountdown(target);
  const units = [
    { v: d, l: "Days" }, { v: h, l: "Hrs" }, { v: m, l: "Min" }, { v: s, l: "Sec" },
  ];
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className={`countdown countdown--${size}`}>
      {units.map((u, i) => (
        <React.Fragment key={u.l}>
          <div className="countdown__unit">
            <div className="countdown__num mono">{pad(u.v)}</div>
            <div className="countdown__label">{u.l}</div>
          </div>
          {i < units.length - 1 && <div className="countdown__sep">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---- Animated ticket-availability bar (real-time feel) ---- */
function TicketBar({ compact = false }) {
  const { DRAW } = window.DD;
  const [sold, setSold] = useState(DRAW.ticketsSold);
  const [fill, setFill] = useState(0);
  const pct = (sold / DRAW.ticketsTotal) * 100;

  // animate fill in on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setFill(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  // "live" trickle of sales
  useEffect(() => {
    const id = setInterval(() => {
      setSold((s) => {
        if (s >= DRAW.ticketsTotal - 40) return s;
        return s + Math.floor(Math.random() * 3) + 1;
      });
    }, 4200);
    return () => clearInterval(id);
  }, [DRAW.ticketsTotal]);

  const remaining = DRAW.ticketsTotal - sold;
  const fmt = (n) => n.toLocaleString("en-GB");

  return (
    <div style={{ width: "100%" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 12, gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span className="dot dot--live" />
          <span className="mono" style={{
            fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)",
          }}>Live ticket availability</span>
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--faint)" }}>
          {pct.toFixed(1)}% sold
        </div>
      </div>

      <div style={{
        position: "relative", height: compact ? 10 : 14, borderRadius: 20,
        background: "var(--surface)", overflow: "hidden",
        boxShadow: "inset 0 1px 3px oklch(0 0 0 / 0.5)",
      }}>
        <div style={{
          position: "absolute", inset: 0, width: `${fill}%`,
          background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)",
          boxShadow: "0 0 18px var(--accent-glow)",
          borderRadius: 20,
          transition: "width 1.5s var(--ease)",
        }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: 20,
            background: "linear-gradient(90deg, transparent 60%, oklch(1 0 0 / 0.35) 100%)",
          }} />
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", marginTop: 14,
      }}>
        <Metric label="Tickets remaining" value={fmt(remaining)} accent />
        <Metric label="Entries placed" value={fmt(sold)} right />
      </div>
    </div>
  );
}

function Metric({ label, value, accent, right }) {
  return (
    <div style={{ textAlign: right ? "right" : "left" }}>
      <div className="mono" style={{
        fontVariantNumeric: "tabular-nums", fontWeight: 700, fontSize: 22,
        color: accent ? "var(--accent)" : "var(--text)", letterSpacing: "-0.01em",
      }}>{value}</div>
      <div className="mono" style={{
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--faint)", marginTop: 4,
      }}>{label}</div>
    </div>
  );
}

/* ---- Footer ---- */
function Footer({ go }) {
  const { DRAW } = window.DD;
  return (
    <footer className="carbon" style={{ borderTop: "1px solid var(--line)", paddingTop: 80, paddingBottom: 48 }}>
      <div className="wrap">
        <div className="grid-footer" style={{ paddingBottom: 64 }}>
          <div>
            <Logo onClick={() => go("home")} />
            <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 20, maxWidth: 300 }}>
              The most prestigious dream-car prize platform in the world. One extraordinary
              machine. One life-changing draw.
            </p>
            <div className="display" style={{ fontSize: 22, marginTop: 28, color: "var(--text)" }}>
              Drive the<br />Extraordinary.
            </div>
          </div>
          {[
            { h: "Platform", l: ["The Car", "The Draw", "Winners", "Enter Now"], r: ["home", "draw", "winners", "entry"] },
            { h: "Trust", l: ["How it works", "Draw policy", "Past results", "FAQ"], r: ["draw", "draw", "winners", "draw"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="kicker kicker--muted" style={{ marginBottom: 22 }}>{col.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {col.l.map((l, i) => (
                  <button key={l} onClick={() => go(col.r[i])}
                    style={{ textAlign: "left", color: "var(--muted)", fontSize: 14.5, transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >{l}</button>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="kicker kicker--muted" style={{ marginBottom: 22 }}>Current draw</div>
            <div className="card" style={{ padding: 20 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em" }}>{DRAW.edition}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginTop: 8 }}>{DRAW.name}</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--faint)", marginTop: 10 }}>Closes {DRAW.drawDateLabel}</div>
            </div>
          </div>
        </div>

        <div className="hairline" />
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 28, flexWrap: "wrap", gap: 16,
        }}>
          <p className="mono" style={{ fontSize: 11.5, color: "var(--faint)", letterSpacing: "0.04em", lineHeight: 1.7, maxWidth: 620 }}>
            18+ only. DriveDraw competitions are skill-based prize competitions under the Gambling Act 2005.
            Please play responsibly. This is a concept demonstration — not a live commercial offering.
          </p>
          <div className="mono" style={{ fontSize: 11.5, color: "var(--faint)", letterSpacing: "0.18em" }}>© 2026 DRIVEDRAW</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  useReveal, Logo, Nav, Countdown, useCountdown, TicketBar, Metric, Footer,
});
