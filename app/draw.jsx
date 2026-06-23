/* ============================================================
   DriveDraw — Draw details view
   ============================================================ */

function HowItWorks() {
  const { STEPS } = window.DD;
  return (
    <section className="section">
      <div className="wrap">
        <div className="eyebrow-row reveal"><span className="kicker">How it works</span></div>
        <h2 className="display reveal" style={{ fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 56, maxWidth: 720 }}>
          From £29 to the<br />driver's seat in four steps.
        </h2>
        <div className="grid-4 grid-panel">
          {STEPS.map((s) => (
            <div key={s.n} className="reveal" style={{ background: "var(--bg-2)", padding: "34px 28px", position: "relative" }}>
              <div className="mono" style={{ fontSize: 13, color: "var(--accent)", letterSpacing: "0.1em" }}>{s.n}</div>
              <div style={{ height: 1, background: "var(--line)", margin: "20px 0 24px" }} />
              <div style={{ fontWeight: 700, fontSize: 18 }}>{s.t}</div>
              <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 12, lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const { TRUST } = window.DD;
  return (
    <section className="carbon" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "100px 0" }}>
      <div className="wrap">
        <div className="grid-2 grid-2--asym-08" style={{ alignItems: "start" }}>
          <div className="reveal" style={{ position: "sticky", top: 110 }}>
            <span className="kicker">Transparency</span>
            <h2 className="display" style={{ fontSize: "clamp(30px, 3.4vw, 48px)", margin: "22px 0 20px" }}>
              Built on<br />trust, by design.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.65, maxWidth: 360 }}>
              Every safeguard a credible draw should have — written down, not buried. This is what
              keeps the draw fair and your entry protected.
            </p>
          </div>
          <div className="grid-2 grid-panel">
            {TRUST.map((t, i) => (
              <div key={t.k} className="reveal" style={{ background: "var(--bg-2)", padding: "34px 32px" }}>
                <div style={{ width: 30, height: 30, borderRadius: 3, border: "1px solid var(--accent-line)", display: "grid", placeItems: "center", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 12, marginBottom: 22 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17.5 }}>{t.k}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 11, lineHeight: 1.62 }}>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal" style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, padding: "26px 0", textAlign: "left" }}>
        <span style={{ fontWeight: 600, fontSize: 18 }}>{q}</span>
        <span style={{ flex: "none", width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--line-2)", display: "grid", placeItems: "center", color: "var(--accent)", fontSize: 18, transition: "transform 0.3s var(--ease), border-color 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <div className={`acc-body ${open ? "open" : ""}`}>
        <div><p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.7, paddingBottom: 26, maxWidth: 680 }}>{a}</p></div>
      </div>
    </div>
  );
}

function FAQSection() {
  const { FAQ } = window.DD;
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="eyebrow-row reveal"><span className="kicker">Questions</span></div>
        <h2 className="display reveal" style={{ fontSize: "clamp(30px, 3.4vw, 48px)", marginBottom: 32 }}>Good to know.</h2>
        <div>{FAQ.map((f) => <Accordion key={f.q} {...f} />)}</div>
      </div>
    </section>
  );
}

function DrawHeader({ go }) {
  const { DRAW } = window.DD;
  return (
    <section className="page-view" style={{ paddingTop: 130, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="eyebrow-row reveal"><span className="kicker">{DRAW.edition} · The Draw</span></div>
        <div className="grid-2 grid-2--asym-13" style={{ alignItems: "start" }}>
          <div>
            <h1 className="display reveal" style={{ fontSize: "clamp(40px, 5.6vw, 88px)" }}>
              Audi RS6<br /><span className="silver-text">Mansory</span>
            </h1>
            <p className="reveal" style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.65, marginTop: 26, maxWidth: 520 }}>
              {DRAW.sub}. A 1,000 PS statement in forged carbon, finished in Mansory's signature
              gloss black on lime. Valued at {DRAW.valuation} — yours from £{DRAW.ticketPrice}.
            </p>
            <div className="reveal draw-metrics">
              {[["Valuation", DRAW.valuation], ["Cash alternative", DRAW.cashAlt], ["Your odds", DRAW.odds], ["Delivery", "Free, UK-wide"]].map(([k, v]) => (
                <div key={k} style={{ paddingRight: 24, borderRight: "1px solid var(--line)" }}>
                  <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)" }}>{k}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginTop: 7 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* sticky entry card */}
          <div className="reveal card" style={{ padding: 28, position: "sticky", top: 100 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 14 }}>Draw closes in</div>
            <Countdown target={DRAW.drawDate} size="sm" />
            <div style={{ height: 1, background: "var(--line)", margin: "24px 0" }} />
            <TicketBar compact />
            <button className="btn btn--primary btn--block btn--lg" style={{ marginTop: 26 }} onClick={() => go("entry")}>Enter the Draw →</button>
            <div className="mono" style={{ fontSize: 11, color: "var(--faint)", textAlign: "center", marginTop: 14, letterSpacing: "0.06em" }}>Skill-based · 18+ · Secure checkout</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DrawGallery() {
  return (
    <section style={{ paddingBottom: 40 }}>
      <div className="wrap">
        <div className="reveal"><AngleSwitcher /></div>
        <div style={{ marginTop: 28 }} className="reveal"><SpecGrid /></div>
      </div>
    </section>
  );
}

function DrawView({ go }) {
  const ref = useReveal();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div ref={ref}>
      <DrawHeader go={go} />
      <DrawGallery />
      <HowItWorks />
      <TrustBand />
      <FAQSection />
      <FinalCTA go={go} />
    </div>
  );
}

Object.assign(window, { DrawView });
