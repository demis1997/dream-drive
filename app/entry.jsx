/* ============================================================
   DriveDraw — Entry / checkout flow
   ============================================================ */

const BUNDLES = [
  { qty: 5, tag: null },
  { qty: 15, tag: "Popular" },
  { qty: 35, tag: "Best value" },
  { qty: 75, tag: "Max odds" },
];

const QUIZ = {
  q: "To qualify your entry: what is the maximum power output of this Mansory-tuned RS6?",
  options: ["1000 PS", "600 PS", "450 PS", "250 PS"],
  answer: 0,
};

function Stepper({ step, steps }) {
  return (
    <div className="entry-stepper" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 52 }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 30, height: 30, borderRadius: "50%", flex: "none",
              display: "grid", placeItems: "center", fontFamily: "var(--mono)", fontSize: 12,
              border: `1px solid ${i <= step ? "var(--accent)" : "var(--line-2)"}`,
              background: i < step ? "var(--accent)" : "transparent",
              color: i < step ? "var(--accent-ink)" : i === step ? "var(--accent)" : "var(--faint)",
              boxShadow: i === step ? "0 0 16px -2px var(--accent-glow)" : "none",
              transition: "all 0.3s var(--ease)",
            }}>{i < step ? "✓" : i + 1}</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: i <= step ? "var(--text)" : "var(--faint)", whiteSpace: "nowrap" }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: i < step ? "var(--accent-line)" : "var(--line)", margin: "0 18px", minWidth: 24, transition: "background 0.3s" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label style={{ display: "block" }}>
      <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--faint)", display: "block", marginBottom: 9 }}>{label}</span>
      <input {...props} style={{
        width: "100%", height: 50, background: "var(--surface)", border: "1px solid var(--line-2)",
        borderRadius: 3, padding: "0 16px", color: "var(--text)", fontFamily: "var(--font)", fontSize: 15,
        outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
      }}
        onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-soft)"; }}
        onBlur={(e) => { e.target.style.borderColor = "var(--line-2)"; e.target.style.boxShadow = "none"; }}
      />
    </label>
  );
}

/* ---------- Step 1: tickets ---------- */
function StepTickets({ qty, setQty }) {
  const { DRAW } = window.DD;
  return (
    <div>
      <h2 className="display" style={{ fontSize: 32, marginBottom: 10 }}>How many entries?</h2>
      <p style={{ color: "var(--muted)", fontSize: 15.5, marginBottom: 36 }}>Each ticket is a unique number in the draw. More tickets, better odds. Capped at {DRAW.maxPerPerson} per person.</p>

      <div className="bundle-grid">
        {BUNDLES.map((b) => {
          const on = qty === b.qty;
          return (
            <button key={b.qty} onClick={() => setQty(b.qty)} style={{
              position: "relative", padding: "26px 16px", borderRadius: 4, textAlign: "center",
              border: `1px solid ${on ? "var(--accent)" : "var(--line-2)"}`,
              background: on ? "var(--accent-soft)" : "var(--surface)",
              boxShadow: on ? "0 0 22px -6px var(--accent-glow)" : "none",
              transition: "all 0.25s var(--ease)",
            }}>
              {b.tag && <span className="mono" style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--accent)", color: "var(--accent-ink)", padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap" }}>{b.tag}</span>}
              <div style={{ fontWeight: 800, fontSize: 34, lineHeight: 1, color: on ? "var(--text)" : "var(--text)" }}>{b.qty}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>£{b.qty * DRAW.ticketPrice}</div>
            </button>
          );
        })}
      </div>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--faint)" }}>Custom amount</span>
          <span className="mono" style={{ fontSize: 13, color: "var(--accent)" }}>{qty} tickets</span>
        </div>
        <input type="range" min="1" max={DRAW.maxPerPerson} value={qty} onChange={(e) => setQty(+e.target.value)}
          style={{ width: "100%", accentColor: "var(--accent)" }} />
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--faint)", marginTop: 10 }}>
          <span>1</span><span>{DRAW.maxPerPerson} (max)</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 2: quiz ---------- */
function StepQuiz({ pick, setPick }) {
  return (
    <div>
      <h2 className="display" style={{ fontSize: 32, marginBottom: 10 }}>The skill question</h2>
      <p style={{ color: "var(--muted)", fontSize: 15.5, marginBottom: 36 }}>A correct answer qualifies your entry under UK prize-competition law. The answer is on the car's spec sheet.</p>
      <div style={{ fontWeight: 600, fontSize: 19, marginBottom: 24, maxWidth: 560 }}>{QUIZ.q}</div>
      <div className="quiz-grid">
        {QUIZ.options.map((o, i) => {
          const on = pick === i;
          return (
            <button key={o} onClick={() => setPick(i)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "20px 22px", borderRadius: 4, textAlign: "left",
              border: `1px solid ${on ? "var(--accent)" : "var(--line-2)"}`,
              background: on ? "var(--accent-soft)" : "var(--surface)",
              transition: "all 0.2s var(--ease)",
            }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", flex: "none", border: `1px solid ${on ? "var(--accent)" : "var(--line-2)"}`, display: "grid", placeItems: "center", color: "var(--accent)", fontSize: 12 }}>{on ? "✓" : String.fromCharCode(65 + i)}</span>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Step 3: details ---------- */
function StepDetails({ form, setForm }) {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div>
      <h2 className="display" style={{ fontSize: 32, marginBottom: 10 }}>Your details</h2>
      <p style={{ color: "var(--muted)", fontSize: 15.5, marginBottom: 36 }}>We only need this to contact you if you win and arrange handover. 18+ only.</p>
      <div className="grid-2 grid-2--18">
        <Field label="First name" placeholder="Alex" value={form.first} onChange={set("first")} />
        <Field label="Last name" placeholder="Mercer" value={form.last} onChange={set("last")} />
        <Field label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} />
        <Field label="Phone" type="tel" placeholder="07000 000000" value={form.phone} onChange={set("phone")} />
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Date of birth" type="text" placeholder="DD / MM / YYYY" value={form.dob} onChange={set("dob")} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 4: payment ---------- */
function StepPayment({ form, setForm }) {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div>
      <h2 className="display" style={{ fontSize: 32, marginBottom: 10 }}>Secure payment</h2>
      <p style={{ color: "var(--muted)", fontSize: 15.5, marginBottom: 28 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span className="dot" style={{ width: 6, height: 6, boxShadow: "none" }} /> 256-bit encrypted · 3-D Secure · demo only — do not enter real card details</span>
      </p>
      <div style={{ display: "grid", gap: 18 }}>
        <Field label="Cardholder name" placeholder="Alex Mercer" value={form.card} onChange={set("card")} />
        <Field label="Card number" placeholder="4242 4242 4242 4242" value={form.num} onChange={set("num")} />
        <div className="grid-2 grid-2--18">
          <Field label="Expiry" placeholder="MM / YY" value={form.exp} onChange={set("exp")} />
          <Field label="CVC" placeholder="123" value={form.cvc} onChange={set("cvc")} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Confirmation ---------- */
function Confirmation({ qty, go, ticketNos }) {
  const { DRAW } = window.DD;
  return (
    <div style={{ textAlign: "center", padding: "20px 0 40px" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 28px", display: "grid", placeItems: "center", background: "var(--accent-soft)", border: "1px solid var(--accent)", color: "var(--accent)", fontSize: 30, boxShadow: "0 0 32px -6px var(--accent-glow)" }}>✓</div>
      <span className="kicker">You're in the draw</span>
      <h2 className="display" style={{ fontSize: "clamp(34px, 4.6vw, 60px)", margin: "18px 0 16px" }}>Good luck.</h2>
      <p style={{ color: "var(--muted)", fontSize: 17, maxWidth: 480, margin: "0 auto 36px" }}>
        {qty} {qty === 1 ? "entry is" : "entries are"} confirmed for the {DRAW.name}. A receipt is on its way to your inbox. The draw is live on {DRAW.drawDateLabel}.
      </p>

      <div className="card" style={{ padding: 28, maxWidth: 520, margin: "0 auto", textAlign: "left" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 16 }}>Your ticket numbers</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ticketNos.map((n) => (
            <span key={n} className="mono" style={{ fontSize: 13, padding: "7px 12px", borderRadius: 3, background: "var(--surface)", border: "1px solid var(--line-2)", color: "var(--text)" }}>#{n}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40 }}>
        <button className="btn btn--primary btn--lg" onClick={() => go("winners")}>See past winners →</button>
        <button className="btn btn--ghost btn--lg" onClick={() => go("home")}>Back to home</button>
      </div>
    </div>
  );
}

/* ---------- Order summary sidebar ---------- */
function OrderSummary({ qty }) {
  const { DRAW } = window.DD;
  const subtotal = qty * DRAW.ticketPrice;
  const odds = Math.round(DRAW.ticketsTotal / qty);
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", position: "sticky", top: 100 }}>
      <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
        <img src="assets/rs6-hero.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 58%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, var(--bg-2), transparent 60%)" }} />
        <div className="tag" style={{ position: "absolute", top: 14, left: 14, background: "oklch(0.145 0.008 260 / 0.7)", backdropFilter: "blur(8px)" }}>{DRAW.edition}</div>
      </div>
      <div style={{ padding: 26 }}>
        <div style={{ fontWeight: 700, fontSize: 19 }}>{DRAW.name}</div>
        <div className="mono" style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>{DRAW.sub}</div>

        <div style={{ height: 1, background: "var(--line)", margin: "22px 0" }} />

        {[["Tickets", `${qty} × £${DRAW.ticketPrice}`], ["Your odds", `1 in ${odds.toLocaleString("en-GB")}`], ["Draw date", DRAW.drawDateLabel]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 13 }}>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>{k}</span>
            <span className="mono" style={{ fontSize: 13, color: "var(--text)" }}>{v}</span>
          </div>
        ))}

        <div style={{ height: 1, background: "var(--line)", margin: "18px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--faint)" }}>Total</span>
          <span style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em" }}>£{subtotal.toLocaleString("en-GB")}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Flow controller ---------- */
function EntryView({ go }) {
  const { DRAW } = window.DD;
  const STEPS = ["Tickets", "Question", "Details", "Payment"];
  const [step, setStep] = useState(0);
  const [qty, setQty] = useState(15);
  const [pick, setPick] = useState(null);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", dob: "", card: "", num: "", exp: "", cvc: "" });
  const [done, setDone] = useState(false);
  const [processing, setProcessing] = useState(false);
  const ticketNos = useRef([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { setErr(""); }, [step]);

  const next = () => {
    if (step === 1) {
      if (pick === null) return setErr("Please choose an answer to qualify your entry.");
      if (pick !== QUIZ.answer) return setErr("That's not quite right — check the car's power figure on the spec sheet.");
    }
    if (step === 2) {
      if (!form.first || !form.last || !form.email || !form.dob) return setErr("Please complete your name, email and date of birth.");
      if (!/\S+@\S+\.\S+/.test(form.email)) return setErr("That email doesn't look right.");
    }
    if (step === 3) {
      if (!form.card || !form.num || !form.exp || !form.cvc) return setErr("Please complete all payment fields.");
      setProcessing(true);
      setTimeout(() => {
        ticketNos.current = Array.from({ length: Math.min(qty, 75) }, () => String(Math.floor(1000 + Math.random() * 18995)).padStart(5, "0"));
        setProcessing(false);
        setDone(true);
      }, 1600);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  if (done) {
    return (
      <div className="entry-view" style={{ paddingTop: 140, paddingBottom: 100 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Confirmation qty={qty} go={go} ticketNos={ticketNos.current} />
        </div>
      </div>
    );
  }

  return (
    <div className="entry-view" style={{ paddingTop: 130, paddingBottom: 100 }}>
      <div className="wrap">
        <div className="eyebrow-row"><span className="kicker">Enter the Draw · {DRAW.edition}</span></div>
        <div className="grid-2 grid-2--asym-15" style={{ alignItems: "start" }}>
          <div>
            <Stepper step={step} steps={STEPS} />
            {step === 0 && <StepTickets qty={qty} setQty={setQty} />}
            {step === 1 && <StepQuiz pick={pick} setPick={setPick} />}
            {step === 2 && <StepDetails form={form} setForm={setForm} />}
            {step === 3 && <StepPayment form={form} setForm={setForm} />}

            {err && <div className="mono" style={{ marginTop: 24, color: "oklch(0.7 0.18 25)", fontSize: 13, letterSpacing: "0.04em" }}>⚠ {err}</div>}

            <div className="stack-buttons" style={{ marginTop: 40 }}>
              {step > 0 && <button className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>← Back</button>}
              <button className="btn btn--primary" style={{ flex: 1 }} onClick={next} disabled={processing}>
                {processing ? "Processing…" : step === 3 ? `Pay £${(qty * DRAW.ticketPrice).toLocaleString("en-GB")} →` : "Continue →"}
              </button>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--faint)", marginTop: 18, letterSpacing: "0.04em" }}>
              By entering you agree to the draw terms. 18+ only. Skill-based prize competition.
            </div>
          </div>

          <OrderSummary qty={qty} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EntryView });
