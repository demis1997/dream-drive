/* ============================================================
   DriveDraw — Winners Hall of Fame
   ============================================================ */

function WinnerStory({ w, idx }) {
  const flip = idx % 2 === 1;
  return (
    <div className="reveal" style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
      border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden",
      background: "var(--bg-2)",
    }}>
      {/* media */}
      <div style={{ position: "relative", minHeight: 420, order: flip ? 2 : 1 }}>
        <image-slot id={w.slot} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} shape="rect" fit="cover" placeholder={`${w.name} — handover photo`} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, oklch(0.145 0.008 260 / 0.5), transparent 50%)", pointerEvents: "none" }} />
        {w.video && (
          <div style={{ position: "absolute", left: 22, bottom: 22, display: "flex", alignItems: "center", gap: 12, pointerEvents: "none" }}>
            <span style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center", color: "var(--accent-ink)", fontSize: 15, paddingLeft: 3, boxShadow: "0 0 22px var(--accent-glow)" }}>▶</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff" }}>Watch handover</span>
          </div>
        )}
      </div>

      {/* story */}
      <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center", order: flip ? 1 : 2 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>{w.edition}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
          <h3 className="display" style={{ fontSize: "clamp(26px, 2.6vw, 38px)" }}>{w.name}</h3>
          <span className="mono" style={{ fontSize: 13, color: "var(--faint)" }}>{w.city}</span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 17, color: "var(--silver, #cfd3da)", marginTop: 10 }}>
          <span className="silver-text">Won the {w.car}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7, marginTop: 24, fontStyle: "italic", borderLeft: "2px solid var(--accent)", paddingLeft: 20 }}>
          “{w.quote}”
        </p>
        <div className="mono" style={{ fontSize: 12, color: "var(--faint)", marginTop: 24, letterSpacing: "0.1em" }}>{w.odds}</div>
      </div>
    </div>
  );
}

function WinnersHero() {
  const { STATS } = window.DD;
  return (
    <section style={{ paddingTop: 140, paddingBottom: 70 }}>
      <div className="wrap">
        <div className="eyebrow-row reveal"><span className="kicker">Hall of Fame</span></div>
        <h1 className="display reveal" style={{ fontSize: "clamp(44px, 6.5vw, 100px)", maxWidth: 980 }}>
          Forty-one dreams,<br /><span className="silver-text">delivered.</span>
        </h1>
        <p className="reveal" style={{ color: "var(--muted)", fontSize: 19, lineHeight: 1.6, marginTop: 28, maxWidth: 560 }}>
          Every DriveDraw winner is treated like a VIP — filmed handovers, white-glove delivery,
          and a story worth telling. This is where they live forever.
        </p>
        <div className="reveal" style={{ display: "flex", gap: 48, marginTop: 48, flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <div key={s.k}>
              <div className="silver-text" style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginTop: 10 }}>{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialWall() {
  const { SOCIAL } = window.DD;
  return (
    <section className="section">
      <div className="wrap">
        <div className="eyebrow-row reveal"><span className="kicker">From the community</span></div>
        <h2 className="display reveal" style={{ fontSize: "clamp(28px, 3.2vw, 46px)", marginBottom: 44 }}>Tagged #DriveDraw</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SOCIAL.map((s) => (
            <div key={s.handle} className="reveal card" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
                <image-slot id={s.slot} style={{ width: "100%", height: "100%" }} shape="rect" fit="cover" placeholder="Drop social post" />
              </div>
              <div style={{ padding: "18px 20px" }}>
                <div className="mono" style={{ fontSize: 12.5, color: "var(--accent)", letterSpacing: "0.04em" }}>{s.handle}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WinnersView({ go }) {
  const ref = useReveal();
  const { WINNERS } = window.DD;
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div ref={ref}>
      <WinnersHero />
      <section style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {WINNERS.map((w, i) => <WinnerStory key={w.name} w={w} idx={i} />)}
        </div>
      </section>
      <SocialWall />
      <FinalCTA go={go} />
    </div>
  );
}

Object.assign(window, { WinnersView });
