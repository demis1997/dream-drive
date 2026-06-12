/* ============================================================
   DriveDraw — car components: spec anatomy + angle switcher
   ============================================================ */

/* ---- Interactive hotspot anatomy over the hero car ---- */
function SpecAnatomy() {
  const { HOTSPOTS } = window.DD;
  const [active, setActive] = useState("hood");
  const cur = HOTSPOTS.find((h) => h.id === active) || HOTSPOTS[0];

  return (
    <div className="reveal" style={{
      position: "relative", borderRadius: 6, overflow: "hidden",
      border: "1px solid var(--line)", background: "var(--bg-2)",
      aspectRatio: "16 / 10",
    }}>
      <img src="assets/rs6-hero.jpg" alt="Audi RS6 Mansory"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(120% 90% at 50% 40%, transparent 40%, oklch(0.145 0.008 260 / 0.65) 100%)",
      }} />
      {/* color grade */}
      <div style={{ position: "absolute", inset: 0, background: "var(--accent-soft)", mixBlendMode: "soft-light" }} />

      {HOTSPOTS.map((h) => (
        <button key={h.id} onClick={() => setActive(h.id)}
          onMouseEnter={() => setActive(h.id)}
          aria-label={h.label}
          style={{
            position: "absolute", left: `${h.x}%`, top: `${h.y}%`,
            transform: "translate(-50%, -50%)", width: 30, height: 30,
            borderRadius: "50%", display: "grid", placeItems: "center", zIndex: 3,
          }}>
          <span style={{
            width: active === h.id ? 16 : 11, height: active === h.id ? 16 : 11,
            borderRadius: "50%",
            background: active === h.id ? "var(--accent)" : "oklch(1 0 0 / 0.9)",
            boxShadow: active === h.id ? "0 0 0 5px var(--accent-soft), 0 0 18px var(--accent-glow)" : "0 0 0 4px oklch(0 0 0 / 0.35)",
            transition: "all 0.25s var(--ease)",
          }} />
          <span style={{
            position: "absolute", width: 30, height: 30, borderRadius: "50%",
            border: "1px solid oklch(1 0 0 / 0.4)",
            animation: active === h.id ? "pulse 1.8s var(--ease) infinite" : "none",
          }} />
        </button>
      ))}

      {/* callout card */}
      <div style={{
        position: "absolute", left: 24, bottom: 24, zIndex: 4,
        background: "oklch(0.145 0.008 260 / 0.78)", backdropFilter: "blur(10px)",
        border: "1px solid var(--line-2)", borderRadius: 4, padding: "16px 20px",
        maxWidth: 320,
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--accent)", textTransform: "uppercase" }}>
          {String(HOTSPOTS.indexOf(cur) + 1).padStart(2, "0")} / {String(HOTSPOTS.length).padStart(2, "0")}
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>{cur.label}</div>
        <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 5 }}>{cur.detail}</div>
      </div>
    </div>
  );
}

/* ---- Angle / 360 switcher ---- */
function AngleSwitcher() {
  const { ANGLES } = window.DD;
  const [idx, setIdx] = useState(0);
  const a = ANGLES[idx];

  return (
    <div>
      <div style={{
        position: "relative", borderRadius: 6, overflow: "hidden",
        border: "1px solid var(--line)", background: "var(--bg-2)",
        aspectRatio: "16 / 10",
      }}>
        {ANGLES.map((ang, i) => (
          <div key={ang.id} style={{
            position: "absolute", inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.6s var(--ease)",
            pointerEvents: i === idx ? "auto" : "none",
          }}>
            {ang.src ? (
              <>
                <img src={ang.src} alt={ang.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: ang.pos || "center 58%" }} />
                <div style={{ position: "absolute", inset: 0, background: "var(--accent-soft)", mixBlendMode: "soft-light" }} />
              </>
            ) : (
              <image-slot id={ang.slot} style={{ width: "100%", height: "100%" }}
                shape="rect" fit="cover" placeholder={`Drop ${ang.label.toLowerCase()} shot`} />
            )}
          </div>
        ))}

        <div className="tag" style={{ position: "absolute", top: 18, left: 18, zIndex: 2, background: "oklch(0.145 0.008 260 / 0.7)", backdropFilter: "blur(8px)" }}>
          <span className="dot" style={{ width: 5, height: 5, boxShadow: "none" }} /> {a.label}
        </div>

        <button onClick={() => setIdx((idx - 1 + ANGLES.length) % ANGLES.length)} aria-label="Previous angle"
          style={arrowStyle("left")}>‹</button>
        <button onClick={() => setIdx((idx + 1) % ANGLES.length)} aria-label="Next angle"
          style={arrowStyle("right")}>›</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${ANGLES.length}, 1fr)`, gap: 10, marginTop: 12 }}>
        {ANGLES.map((ang, i) => (
          <button key={ang.id} onClick={() => setIdx(i)}
            style={{
              position: "relative", aspectRatio: "16 / 10", borderRadius: 3, overflow: "hidden",
              border: `1px solid ${i === idx ? "var(--accent)" : "var(--line)"}`,
              boxShadow: i === idx ? "0 0 16px -4px var(--accent-glow)" : "none",
              transition: "border-color 0.25s, box-shadow 0.25s", background: "var(--surface)",
            }}>
            {ang.src ? (
              <img src={ang.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: ang.pos || "center 58%", opacity: i === idx ? 1 : 0.5, transition: "opacity 0.25s" }} />
            ) : (
              <span className="mono" style={{
                position: "absolute", inset: 0, display: "grid", placeItems: "center",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--faint)",
              }}>{ang.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: "absolute", top: "50%", [side]: 16, transform: "translateY(-50%)",
    width: 46, height: 46, borderRadius: "50%", zIndex: 2,
    background: "oklch(0.145 0.008 260 / 0.6)", backdropFilter: "blur(8px)",
    border: "1px solid var(--line-2)", color: "var(--text)",
    fontSize: 26, lineHeight: 1, display: "grid", placeItems: "center",
    transition: "background 0.2s, border-color 0.2s",
  };
}

/* ---- Spec stat grid ---- */
function SpecGrid() {
  const { SPECS } = window.DD;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 4, overflow: "hidden" }}>
      {SPECS.map((s) => (
        <div key={s.k} className="reveal" style={{ background: "var(--bg-2)", padding: "32px 28px" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--faint)" }}>{s.k}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 16 }}>
            <span style={{ fontWeight: 800, fontSize: 46, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</span>
            <span className="mono" style={{ fontSize: 14, color: "var(--accent)" }}>{s.u}</span>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 14 }}>{s.note}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { SpecAnatomy, AngleSwitcher, SpecGrid });
