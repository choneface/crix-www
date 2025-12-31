"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type SkinId = "paint" | "terminal" | "dark" | "neocities";

type Skin = {
  id: SkinId;
  name: string;
  vars: Record<string, string>;
};

const SKINS: Record<SkinId, Skin> = {
  paint: {
    id: "paint",
    name: "Classic Paint",
    vars: {
      "--bg": "#c0c0c0",
      "--panel": "#d4d4d4",
      "--panel2": "#e8e8e8",
      "--text": "#000000",
      "--muted": "#222222",
      "--borderDark": "#000000",
      "--borderMid": "#808080",
      "--borderLight": "#ffffff",
      "--accent": "#0000ff",
      "--accent2": "#008000",
      "--accent3": "#ff0000",
      "--shadow": "#808080",
      "--font": `ui-monospace, "Minecraftia", "Press Start 2P", "VT323", "MS Sans Serif", "Tahoma", monospace`,
    },
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    vars: {
      "--bg": "#000000",
      "--panel": "#0b0b0b",
      "--panel2": "#111111",
      "--text": "#00ff66",
      "--muted": "#00cc55",
      "--borderDark": "#00ff66",
      "--borderMid": "#007733",
      "--borderLight": "#55ff99",
      "--accent": "#00ff66",
      "--accent2": "#00ff66",
      "--accent3": "#00ff66",
      "--shadow": "#003311",
      "--font": `ui-monospace, "Minecraftia", "Press Start 2P", "VT323", "MS Sans Serif", monospace`,
    },
  },
  dark: {
    id: "dark",
    name: "Dark",
    vars: {
      "--bg": "#1b1b1b",
      "--panel": "#2a2a2a",
      "--panel2": "#333333",
      "--text": "#ffffff",
      "--muted": "#cccccc",
      "--borderDark": "#000000",
      "--borderMid": "#6b6b6b",
      "--borderLight": "#ffffff",
      "--accent": "#7aa2ff",
      "--accent2": "#6bff95",
      "--accent3": "#ff6b6b",
      "--shadow": "#000000",
      "--font": `ui-monospace, "Minecraftia", "Press Start 2P", "VT323", "MS Sans Serif", "Tahoma", monospace`,
    },
  },
  neocities: {
    id: "neocities",
    name: "Neocities",
    vars: {
      "--bg": "#000000",
      "--panel": "#0d0d0d",
      "--panel2": "#151515",
      "--text": "#ffffff",
      "--muted": "#c7c7c7",
      "--borderDark": "#00ffff",
      "--borderMid": "#ff00ff",
      "--borderLight": "#ffff00",
      "--accent": "#00ffff",
      "--accent2": "#ff00ff",
      "--accent3": "#ffff00",
      "--shadow": "#000000",
      "--font": `ui-monospace, "Minecraftia", "Press Start 2P", "VT323", "MS Sans Serif", "Tahoma", monospace`,
    },
  },
};

function getInitialSkin(): SkinId {
  if (typeof window === "undefined") return "paint";
  const saved = window.localStorage.getItem("crix-skin") as SkinId | null;
  return saved && SKINS[saved] ? saved : "paint";
}

export default function Page() {
  const [skinId, setSkinId] = useState<SkinId>("paint");
  const skin = SKINS[skinId];

  const [progress, setProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setSkinId(getInitialSkin());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("crix-skin", skinId);
    }
  }, [skinId]);

  useEffect(() => {
    let done = false;

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (!done) {
            done = true;
            window.clearInterval(timer);
            window.setTimeout(() => setShowSplash(false), 220);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => window.clearInterval(timer);
  }, []);

  const statusText = useMemo(() => {
    if (progress < 25) return "LOADING SYSTEM...";
    if (progress < 55) return "DRAWING RECTANGLES...";
    if (progress < 85) return "FILL TOOL (BUCKET)...";
    if (progress < 100) return "OUTLINE 1PX...";
    return "DONE.";
  }, [progress]);

  const cssVars = useMemo(() => skin.vars as React.CSSProperties, [skin]);

  const isTerminal = skinId === "terminal";
  const isNeo = skinId === "neocities";

  return (
      <div
          className="min-h-screen w-full"
          style={{
            ...(cssVars as any),
            background: "var(--bg)",
            color: "var(--text)",
            fontFamily: "var(--font)",
          }}
      >
        <style>{`
        * { box-sizing: border-box; }
        a { color: var(--accent); text-decoration: underline; }
        .ui { font-family: var(--font); letter-spacing: 0.02em; }
        .pixel { image-rendering: pixelated; }

        .panel {
          background: var(--panel);
          border: 1px solid var(--borderDark);
        }

        .bevel {
          border-top: 2px solid var(--borderLight);
          border-left: 2px solid var(--borderLight);
          border-right: 2px solid var(--borderMid);
          border-bottom: 2px solid var(--borderMid);
          background: var(--panel);
        }

        .bevel-inset {
          border-top: 2px solid var(--borderMid);
          border-left: 2px solid var(--borderMid);
          border-right: 2px solid var(--borderLight);
          border-bottom: 2px solid var(--borderLight);
          background: var(--panel2);
        }

        .btn {
          cursor: pointer;
          user-select: none;
          padding: 10px 12px;
          text-align: center;
          font-size: 14px;
          line-height: 1;
        }
        .btn:active { transform: translate(1px, 1px); }

        .titlebar {
          background: var(--accent);
          color: #000;
          padding: 6px 8px;
          border-bottom: 1px solid var(--borderDark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          text-transform: uppercase;
        }

        .win-controls { display: flex; gap: 6px; }
        .win-btn {
          width: 18px; height: 18px;
          border: 1px solid var(--borderDark);
          background: var(--panel2);
        }

        .crt { position: relative; }
        .crt::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0px,
            rgba(0,0,0,0) 2px,
            rgba(0,0,0,0.28) 3px,
            rgba(0,0,0,0) 4px
          );
          opacity: 0.65;
        }

        /* --- Neocities sauce --- */
        .neo-bg {
          /* "tiled gif" vibe: starfield + confetti + checker */
          background-image:
            radial-gradient(#ffffff 1px, transparent 1px),
            radial-gradient(#00ffff 1px, transparent 1px),
            radial-gradient(#ff00ff 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,0,0.10) 1px, transparent 1px),
            linear-gradient(rgba(255,255,0,0.10) 1px, transparent 1px);
          background-size:
            24px 24px,
            36px 36px,
            48px 48px,
            16px 16px,
            16px 16px;
          background-position:
            0 0,
            10px 6px,
            18px 14px,
            0 0,
            0 0;
        }

        .blink {
          animation: blink 1s steps(1, end) infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .marquee {
          white-space: nowrap;
          overflow: hidden;
          border-top: 1px solid var(--borderDark);
          border-bottom: 1px solid var(--borderDark);
          background: var(--panel2);
        }
        .marquee span {
          display: inline-block;
          padding-left: 100%;
          animation: scroll 9s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .neo-link {
          display: block;
          padding: 6px 8px;
          border: 1px solid var(--borderDark);
          background: #000;
          color: var(--accent);
          text-decoration: none;
          text-transform: uppercase;
          font-size: 12px;
        }
        .neo-link:hover {
          background: var(--accent2);
          color: #000;
        }

        .badge {
          border: 1px solid var(--borderDark);
          background: #000;
          color: #fff;
          font-size: 10px;
          padding: 6px 8px;
          text-transform: uppercase;
          text-align: center;
        }

        .counter {
          border: 1px solid var(--borderDark);
          background: #000;
          color: var(--accent3);
          font-size: 14px;
          padding: 6px 10px;
          letter-spacing: 0.2em;
        }
      `}</style>

        <AnimatePresence mode="wait">
          {showSplash ? (
              <motion.div
                  key="splash"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className={`min-h-screen w-full flex items-center justify-center p-6 ${isNeo ? "neo-bg" : ""}`}
              >
                <div className={`panel ui w-full max-w-xl ${isTerminal ? "crt" : ""}`}>
                  <div className="titlebar" style={{ color: isNeo ? "#000" : "#fff" }}>
                    <div>CRIX.EXE</div>
                    <div className="win-controls">
                      <div className="win-btn" />
                      <div className="win-btn" />
                      <div className="win-btn" />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="bevel-inset p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 900 }}>CRIX</div>
                          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
                            {statusText}
                          </div>
                        </div>

                        <div className="bevel px-3 py-2" style={{ fontSize: 12 }}>
                          SKIN: {skin.name.toUpperCase()}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="bevel p-2">
                          <div className="bevel-inset" style={{ height: 18, position: "relative", overflow: "hidden" }}>
                            <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  height: "100%",
                                  width: `${progress}%`,
                                  background: "var(--accent2)",
                                }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 flex justify-between" style={{ fontSize: 12 }}>
                          <div>BOOT.EXE</div>
                          <div>{progress}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center" style={{ fontSize: 12, color: "var(--muted)" }}>
                      © 2025 CRIX FRAMEWORK
                    </div>
                  </div>
                </div>
              </motion.div>
          ) : (
              <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.12 }}
                  className={`min-h-screen w-full p-4 md:p-8 ${isNeo ? "neo-bg" : ""}`}
              >
                {/* Top window */}
                <div className={`panel ui max-w-6xl mx-auto ${isTerminal ? "crt" : ""}`}>
                  <div className="titlebar" style={{ color: isNeo ? "#000" : "#fff" }}>
                    <div>{isNeo ? "CRIX — MY COOL SITE" : "CRIX WEBSITE — MS PAINT MODE"}</div>
                    <div className="win-controls">
                      <div className="win-btn" />
                      <div className="win-btn" />
                      <div className="win-btn" />
                    </div>
                  </div>

                  {/* Toolbar row */}
                  <div className="p-3 border-b" style={{ borderColor: "var(--borderDark)" }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="bevel px-3 py-2" style={{ fontSize: 12 }}>
                          CRIX.DEV
                        </div>
                        <div className="bevel-inset px-3 py-2" style={{ fontSize: 12 }}>
                          SKINNED UI FRAMEWORK
                        </div>

                        {isNeo && (
                            <div className="bevel px-3 py-2 blink" style={{ fontSize: 12, color: "var(--accent3)" }}>
                              NEW
                            </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <a className="bevel btn" href="/docs">
                          DOCS
                        </a>
                        <a className="bevel btn" href="https://builder.crix.dev">
                          BUILDER
                        </a>

                        <div className="bevel-inset px-3 py-2" style={{ fontSize: 12 }}>
                          SKIN
                        </div>
                        <select
                            value={skinId}
                            onChange={(e) => setSkinId(e.target.value as SkinId)}
                            className="bevel btn"
                            style={{
                              padding: "10px 12px",
                              background: "var(--panel)",
                              color: "var(--text)",
                              outline: "none",
                              border: "none",
                            }}
                        >
                          <option value="paint">CLASSIC PAINT</option>
                          <option value="terminal">TERMINAL</option>
                          <option value="dark">DARK</option>
                          <option value="neocities">NEOCITIES</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Neocities marquee */}
                  {isNeo && (
                      <div className="marquee ui" style={{ fontSize: 12 }}>
                  <span>
                    BEST VIEWED IN 1024x768 • CLICK MY LINKS • SIGN MY GUESTBOOK • JOIN MY WEBRING •
                    DOWNLOAD CRIX •
                  </span>
                      </div>
                  )}

                  {/* Body */}
                  <div className="p-4 md:p-6">
                    {isNeo ? (
                        // --- Neocities layout ---
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                          {/* Left sidebar */}
                          <div className="lg:col-span-3 space-y-4">
                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>LINKS</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3 space-y-2">
                                <a className="neo-link" href="/docs">
                                  DOCS
                                </a>
                                <a className="neo-link" href="/builder">
                                  BUILDER
                                </a>
                                <a className="neo-link" href="#">
                                  DOWNLOAD
                                </a>
                                <a className="neo-link" href="#">
                                  CHANGELOG
                                </a>
                                <a className="neo-link" href="#">
                                  GUESTBOOK
                                </a>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>BADGES</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3 grid grid-cols-2 gap-2">
                                <div className="badge">MADE WITH MS PAINT</div>
                                <div className="badge">NO CSS GRADIENTS</div>
                                <div className="badge">SKIN ENGINE INSIDE</div>
                                <div className="badge">FRAMES: MAYBE</div>
                                <div className="badge">UNDER CONSTRUCTION</div>
                                <div className="badge">CRIX FAN PAGE</div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>WEBRING</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3" style={{ fontSize: 12, lineHeight: 1.35 }}>
                                  YOU ARE NOW ENTERING:
                                  <br />
                                  THE SKINNED-UI WEBRING
                                  <div className="mt-3 grid grid-cols-3 gap-2">
                                    <button className="bevel btn">PREV</button>
                                    <button className="bevel btn">RANDO</button>
                                    <button className="bevel btn">NEXT</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>HITS</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3 flex items-center justify-between gap-3">
                                <div style={{ fontSize: 12 }}>YOU ARE VISITOR #</div>
                                <div className="counter">004239</div>
                              </div>
                            </div>
                          </div>

                          {/* Center content */}
                          <div className="lg:col-span-6 space-y-4">
                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>WELCOME</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="bevel-inset p-4">
                                  <div style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase" }}>
                                    CRIX UI FRAMEWORK
                                  </div>
                                  <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.35 }}>
                                    THIS WEBSITE HAS SKINS BECAUSE THE FRAMEWORK HAS SKINS.
                                    <br />
                                    COMPONENTS = LOGIC.
                                    <br />
                                    SKINS = VIBE.
                                  </div>

                                  <div className="mt-4 bevel p-3" style={{ fontSize: 12 }}>
                                    <div style={{ color: "var(--accent3)" }}>TIP:</div>
                                    TRY THE TERMINAL SKIN. IT IS VERY SERIOUS.
                                  </div>

                                  <div className="mt-4 grid grid-cols-2 gap-2">
                                    <a className="bevel btn" href="/docs">
                                      OPEN DOCS
                                    </a>
                                    <a
                                        className="bevel btn"
                                        href="https://builder.crix.dev"
                                        style={{
                                          background: "var(--accent2)",
                                          color: "#000",
                                          borderTop: "2px solid var(--borderLight)",
                                          borderLeft: "2px solid var(--borderLight)",
                                          borderRight: "2px solid var(--borderMid)",
                                          borderBottom: "2px solid var(--borderMid)",
                                        }}
                                    >
                                      OPEN BUILDER
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>WHAT IS A SKIN?</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="bevel-inset p-4" style={{ fontSize: 13, lineHeight: 1.35 }}>
                                  A SKIN IS A DATA FILE THAT DEFINES:
                                  <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                                    <li>COLORS</li>
                                    <li>BORDERS</li>
                                    <li>TYPOGRAPHY</li>
                                    <li>BUTTON MATERIALS</li>
                                    <li>CURSOR / ICONS</li>
                                  </ul>
                                  <div className="mt-3 bevel p-3" style={{ fontSize: 12 }}>
                                    THIS SITE IS A DEMO APP FOR THE SKIN SYSTEM.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right sidebar */}
                          <div className="lg:col-span-3 space-y-4">
                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>GUESTBOOK</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3" style={{ fontSize: 12, lineHeight: 1.35 }}>
                                  SIGN MY GUESTBOOK!!!
                                  <div className="mt-2 bevel p-2" style={{ background: "#000", color: "var(--accent)" }}>
                                    NAME: ____________
                                    <br />
                                    MESSAGE: ____________
                                  </div>
                                  <button className="bevel btn mt-2">SUBMIT</button>
                                </div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>BEST VIEWED</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3" style={{ fontSize: 12, lineHeight: 1.35 }}>
                                  BEST VIEWED IN:
                                  <div className="mt-2 bevel p-2">1024 x 768</div>
                                  <div className="mt-2 bevel p-2">
                              <span className="blink" style={{ color: "var(--accent3)" }}>
                                UNDER CONSTRUCTION
                              </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#000" }}>
                                <div>UPDATES</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3" style={{ fontSize: 12, lineHeight: 1.35 }}>
                                  12/30/2025: ADDED SKINS
                                  <br />
                                  12/30/2025: MADE IT WORSE
                                  <br />
                                  12/30/2025: NEOCITIES MODE
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    ) : (
                        // --- Default (Paint/Terminal/Dark) layout ---
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="lg:col-span-2">
                            <div className="panel">
                              <div className="titlebar" style={{ color: skinId === "paint" ? "#fff" : "#fff" }}>
                                <div>INTRO.TXT</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>

                              <div className="p-4">
                                <div className="bevel-inset p-4">
                                  <div style={{ fontSize: 22, fontWeight: 900 }}>CRIX UI FRAMEWORK</div>
                                  <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.35 }}>
                                    Crix is a framework for skinned UIs.
                                    <br />
                                    The look is data. Components are logic.
                                    <br />
                                    Swap skins. Ship platforms.
                                  </div>

                                  <div className="mt-4 flex flex-wrap gap-2">
                                    {[
                                      "THEMES AS DATA",
                                      "SQUARE PIXEL UI",
                                      "BUILDER OUTPUT",
                                      "CROSS-PLATFORM",
                                      "NO SOFTNESS ALLOWED",
                                    ].map((tag) => (
                                        <div key={tag} className="bevel px-3 py-2" style={{ fontSize: 12 }}>
                                          {tag}
                                        </div>
                                    ))}
                                  </div>

                                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                    <a className="bevel btn" href="/docs" style={{ minWidth: 160 }}>
                                      OPEN DOCS
                                    </a>
                                    <a
                                        className="bevel btn"
                                        href="https://builder.crix.dev"
                                        style={{
                                          minWidth: 160,
                                          background: "var(--accent2)",
                                          color: skinId === "terminal" ? "#000" : "#fff",
                                          borderTop: "2px solid var(--borderLight)",
                                          borderLeft: "2px solid var(--borderLight)",
                                          borderRight: "2px solid var(--borderMid)",
                                          borderBottom: "2px solid var(--borderMid)",
                                        }}
                                    >
                                      OPEN BUILDER
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="panel">
                              <div className="titlebar" style={{ color: "#fff" }}>
                                <div>WHY</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3" style={{ fontSize: 13, lineHeight: 1.35 }}>
                                  Most UI kits hardcode a feeling.
                                  <br />
                                  Crix ships an engine.
                                  <br />
                                  If your app needs skins, Crix is the point.
                                </div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#fff" }}>
                                <div>DOWNLOAD</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3">
                                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                                    Crix Runner (placeholder)
                                  </div>
                                  <div className="mt-2 grid grid-cols-3 gap-2">
                                    {["WIN", "MAC", "LINUX"].map((p) => (
                                        <button key={p} className="bevel btn">
                                          {p}
                                        </button>
                                    ))}
                                  </div>
                                  <div className="mt-2" style={{ fontSize: 12 }}>
                                    <a href="#">RELEASE NOTES</a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="panel">
                              <div className="titlebar" style={{ color: "#fff" }}>
                                <div>STATUS</div>
                                <div className="win-controls">
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                  <div className="win-btn" />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="bevel-inset p-3" style={{ fontSize: 12, lineHeight: 1.35 }}>
                                  UI: SQUARE
                                  <br />
                                  GRADIENTS: NO
                                  <br />
                                  BLUR: ILLEGAL
                                  <br />
                                  STYLE: MS PAINT
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}

                    <div className="mt-6 panel">
                      <div className="p-3 ui" style={{ fontSize: 12 }}>
                        © 2025 CRIX • <a href="/docs">DOCS</a> • <a href="https://builder.crix.dev">BUILDER</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
