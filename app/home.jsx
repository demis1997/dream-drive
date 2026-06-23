/* ============================================================
   DriveDraw — Home view
   ============================================================ */

function Hero({ go, slogan }) {
  const { DRAW } = window.DD;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const id = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(id); }, []);

  const words = (slogan || "Drive the Extraordinary").trim().split(" ");
  const lastWord = words.length > 1 ? words.pop() : "";
  const lead = words.join(" ");

  return (
    <section className="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="assets/rs6-hero.jpg" alt="Audi RS6 Mansory"
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "62% 56%",
            transform: loaded ? "scale(1.02)" : "scale(1.12)",
            transition: "transform 2.4s var(--ease)",
          }} />
        {/* cinematic blue color grade */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, var(--accent) 0%, transparent 60%)", mixBlendMode: "soft-light", opacity: 0.5 }} />
        {/* left scrim for text */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg, var(--bg) 8%, oklch(0.145 0.008 260 / 0.72) 38%, oklch(0.145 0.008 260 / 0.1) 68%, transparent 100%)" }} />
        {/* bottom scrim */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, var(--bg) 0%, transparent 34%)" }} />
        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(110% 80% at 60% 45%, transparent 55%, oklch(0 0 0 / 0.5) 100%)" }} />
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 120 }}>
        <div style={{ maxWidth: 720 }}>
          <div className="anim-up hero-meta" style={anim(loaded, 0)}>
            <span className="tag" style={{ borderColor: "var(--accent-line)", color: "var(--accent)" }}>
              <span className="dot dot--live" style={{ width: 5, height: 5 }} /> {DRAW.edition} · Now Open
            </span>
            <span className="mono" style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em" }}>{DRAW.odds} odds</span>
          </div>

          <h1 className="display anim-up" style={{ fontSize: "clamp(48px, 7vw, 104px)", ...anim(loaded, 1) }}>
            {lead}{lastWord && <br />}<span className="silver-text">{lastWord}</span>
          </h1>

          <p className="anim-up" style={{ fontSize: "clamp(17px, 1.5vw, 21px)", color: "var(--muted)", marginTop: 28, maxWidth: 500, ...anim(loaded, 2) }}>
            Win a fully carbon, Mansory-tuned <strong style={{ color: "var(--text)", fontWeight: 600 }}>Audi RS6</strong> producing 1,000 PS — or take {DRAW.cashAlt} tax-free. One car. One draw. From just £{DRAW.ticketPrice}.
          </p>

          <div className="anim-up hero-actions" style={anim(loaded, 3)}>
            <button className="btn btn--primary btn--lg" onClick={() => go("entry")}>Enter the Draw →</button>
            <button className="btn btn--ghost btn--lg" onClick={() => go("draw")}>View the Car</button>
          </div>
        </div>
      </div>

      {/* bottom live console */}
      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBottom: 40 }}>
        <div className="anim-up grid-hero-console" style={{
          background: "oklch(0.145 0.008 260 / 0.62)", backdropFilter: "blur(16px)",
          border: "1px solid var(--line)", borderRadius: 6,
          ...anim(loaded, 4),
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 16 }}>Draw closes in</div>
            <Countdown target={DRAW.drawDate} />
            <div className="mono" style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 16, letterSpacing: "0.08em" }}>{DRAW.drawDateLabel}</div>
          </div>
          <div className="grid-hero-console__divider" />
          <div><TicketBar /></div>
        </div>
      </div>
    </section>
  );
}

function anim(loaded, i) {
  return {
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(24px)",
    transition: `opacity 0.9s var(--ease) ${0.15 + i * 0.12}s, transform 0.9s var(--ease) ${0.15 + i * 0.12}s`,
  };
}

/* ---- Marquee strip ---- */
function Marquee() {
  const items = ["1000 PS", "Forged Carbon Widebody", "0–100 in 2.8s", "Tax-free cash alternative", "Free UK delivery", "Independently drawn", "330 km/h derestricted"];
  const row = [...items, ...items];
  return (
    <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", background: "var(--bg-2)", padding: "20px 0" }}>
      <div style={{ display: "flex", gap: 56, whiteSpace: "nowrap", animation: "scroll-x 36s linear infinite", width: "max-content" }}>
        {row.map((t, i) => (
          <span key={i} className="mono" style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 56 }}>
            {t}<span style={{ color: "var(--accent)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---- Anatomy + specs section ---- */
function CarSection({ go }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="eyebrow-row reveal"><span className="kicker">The Prize</span></div>
        <div className="grid-2 grid-2--asym-11" style={{ alignItems: "end", marginBottom: 56 }}>
          <h2 className="display reveal" style={{ fontSize: "clamp(34px, 4.4vw, 64px)" }}>
            Audi RS6 <span style={{ color: "var(--accent)" }}>Mansory</span>
          </h2>
          <p className="reveal" style={{ color: "var(--muted)", fontSize: 16.5, lineHeight: 1.65 }}>
            A factory super-estate reimagined by Mansory: forged-carbon widebody, 22-inch
            monoblocks and a 1,000 PS twin-turbo V8. Hover the markers to explore the build.
          </p>
        </div>

        <SpecAnatomy />

        <div style={{ marginTop: 28 }}><SpecGrid /></div>

        <div className="reveal" style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <button className="btn btn--ghost" onClick={() => go("draw")}>Full specification & gallery →</button>
        </div>
      </div>
    </section>
  );
}

/* ---- Stats band ---- */
function StatsBand() {
  const { STATS } = window.DD;
  return (
    <section className="carbon" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "76px 0" }}>
      <div className="wrap grid-4 grid-4--gap32">
        {STATS.map((s) => (
          <div key={s.k} className="reveal" style={{ textAlign: "center" }}>
            <div className="silver-text" style={{ fontWeight: 800, fontSize: "clamp(36px, 4vw, 58px)", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
            <div className="mono" style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginTop: 14 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Winners preview ---- */
function WinnersPreview({ go }) {
  const { WINNERS } = window.DD;
  return (
    <section className="section">
      <div className="wrap">
        <div className="eyebrow-row reveal"><span className="kicker">Hall of Fame</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 48, flexWrap: "wrap" }}>
          <h2 className="display reveal" style={{ fontSize: "clamp(32px, 4vw, 56px)", maxWidth: 640 }}>
            Real people.<br />Real keys. Real stories.
          </h2>
          <button className="btn btn--ghost reveal" onClick={() => go("winners")}>Enter the Hall of Fame →</button>
        </div>

        <div className="grid-3">
          {WINNERS.map((w) => (
            <button key={w.name} onClick={() => go("winners")} className="reveal card" style={{
              textAlign: "left", overflow: "hidden", padding: 0, cursor: "pointer",
              transition: "transform 0.3s var(--ease), border-color 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--accent-line)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--line)"; }}>
              <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                <image-slot id={w.slot} style={{ width: "100%", height: "100%" }} shape="rect" fit="cover" placeholder={`${w.name.split(" ")[0]} — handover photo`} />
                {w.video && (
                  <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
                    <span style={{ width: 52, height: 52, borderRadius: "50%", background: "oklch(0.145 0.008 260 / 0.6)", backdropFilter: "blur(6px)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center", color: "#fff", fontSize: 15, paddingLeft: 3 }}>▶</span>
                  </span>
                )}
              </div>
              <div style={{ padding: "20px 22px 24px" }}>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>{w.edition}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 9 }}>{w.name}</div>
                <div className="mono" style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>{w.car} · {w.city}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Final CTA ---- */
function FinalCTA({ go }) {
  const { DRAW } = window.DD;
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "120px 0" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="assets/rs6-detail.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, var(--bg), oklch(0.145 0.008 260 / 0.7))" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--accent-soft)", mixBlendMode: "soft-light" }} />
      </div>
      <div className="wrap reveal" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <span className="kicker">Edition 01 · Closes {DRAW.drawDateLabel}</span>
        <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 86px)", margin: "26px 0 0" }}>
          Your turn behind<br />the wheel.
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 24, maxWidth: 520, marginInline: "auto" }}>
          {((DRAW.ticketsTotal - DRAW.ticketsSold)).toLocaleString("en-GB")} tickets remaining at £{DRAW.ticketPrice}. When they're gone, the draw is drawn.
        </p>
        <div className="stack-buttons" style={{ justifyContent: "center", marginTop: 40 }}>
          <button className="btn btn--primary btn--lg" onClick={() => go("entry")}>Enter Now →</button>
          <button className="btn btn--ghost btn--lg" onClick={() => go("winners")}>Meet the Winners</button>
        </div>
      </div>
    </section>
  );
}

function HomeView({ go, slogan }) {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <Hero go={go} slogan={slogan} />
      <Marquee />
      <CarSection go={go} />
      <StatsBand />
      <WinnersPreview go={go} />
      <FinalCTA go={go} />
    </div>
  );
}

Object.assign(window, { HomeView });
