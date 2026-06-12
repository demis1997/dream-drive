/* ============================================================
   DriveDraw — router, theming, Tweaks, mount
   ============================================================ */

const ACCENTS = {
  "Electric Blue": { l: 0.64, c: 0.21, h: 255 },
  "Mansory Green": { l: 0.84, c: 0.22, h: 142 },
  "Ice Silver":    { l: 0.86, c: 0.03, h: 250 },
};

function applyAccent(name, glow) {
  const a = ACCENTS[name] || ACCENTS["Electric Blue"];
  const root = document.documentElement;
  const base = `${a.l} ${a.c} ${a.h}`;
  root.style.setProperty("--accent", `oklch(${base})`);
  root.style.setProperty("--accent-2", `oklch(${Math.min(a.l + 0.08, 0.95)} ${Math.max(a.c - 0.03, 0)} ${a.h - 6})`);
  root.style.setProperty("--accent-soft", `oklch(${base} / 0.16)`);
  root.style.setProperty("--accent-line", `oklch(${base} / 0.45)`);
  root.style.setProperty("--accent-glow", `oklch(${base} / ${(0.52 * glow).toFixed(3)})`);
  root.style.setProperty("--accent-ink", `oklch(0.17 0.03 ${a.h})`);
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "Electric Blue",
  "slogan": "Drive the Extraordinary",
  "grain": true,
  "glow": 1
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState("home");

  const go = useCallback((r) => { setRoute(r); window.scrollTo(0, 0); }, []);

  // apply accent theme + glow
  useEffect(() => { applyAccent(t.accent, t.glow); }, [t.accent, t.glow]);

  // grain
  useEffect(() => {
    document.body.classList.toggle("carbon", !!t.grain);
  }, [t.grain]);

  const views = {
    home: <HomeView go={go} slogan={t.slogan} />,
    draw: <DrawView go={go} />,
    winners: <WinnersView go={go} />,
    entry: <EntryView go={go} />,
  };

  return (
    <React.Fragment>
      <Nav route={route} go={go} />
      <main>{views[route]}</main>
      <Footer go={go} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand accent" />
        <TweakRadio label="Accent" value={t.accent}
          options={["Electric Blue", "Mansory Green", "Ice Silver"]}
          onChange={(v) => setTweak("accent", v)} />
        <p style={{ fontSize: 11, color: "var(--muted)", margin: "2px 2px 4px", lineHeight: 1.5 }}>
          “Mansory Green” matches the car’s real accents.
        </p>

        <TweakSection label="Feel" />
        <TweakSlider label="Glow intensity" value={t.glow} min={0} max={1.6} step={0.1}
          onChange={(v) => setTweak("glow", v)} />
        <TweakToggle label="Carbon grain" value={t.grain}
          onChange={(v) => setTweak("grain", v)} />

        <TweakSection label="Copy" />
        <TweakText label="Hero slogan" value={t.slogan}
          onChange={(v) => setTweak("slogan", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
