"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type SkinId = "paint" | "terminal" | "dark" | "neocities";

type Skin = {
  id: SkinId;
  name: string;
  vars: Record<string, string>;
  pageBg?: string;
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
      "--accent3": "#ff00ff",
      "--shadow": "#808080",
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
            window.setTimeout(() => setShowSplash(false), 250);
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
        .pixel { image-rendering: pixelated; }
        .ui { font-family: var(--font); letter-spacing: 0.02em; }

        /* Classic square panel */
        .panel {
          background: var(--panel);
          border: 1px solid var(--borderDark);
        }

        /* Fake Win9x bevel (hard, square) */
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
        .btn:active {
          transform: translate(1px, 1px);
        }

        .titlebar {
          background: var(--accent);
          color: #fff;
          padding: 6px 8px;
          border-bottom: 1px solid var(--borderDark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
        }

        .win-controls { display: flex; gap: 6px; }
        .win-btn {
          width: 18px; height: 18px;
          border: 1px solid var(--borderDark);
          background: var(--panel2);
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px);
          background-size: 16px 16px;
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
          animation: scroll 10s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        /* Terminal extras */
        .crt {
          position: relative;
        }
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
      `}</style>

        <AnimatePresence mode="wait">
          {showSplash ? (
              <motion.div
                  key="splash"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="min-h-screen w-full flex items-center justify-center p-6"
              >
                <div className={`panel ui w-full max-w-xl ${skinId === "terminal" ? "crt" : ""}`}>
                  <div className="titlebar">
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
                          <div
                              className="bevel-inset"
                              style={{ height: 18, position: "relative", overflow: "hidden" }}
                          >
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
                  transition={{ duration: 0.15 }}
                  className={`min-h-screen w-full p-4 md:p-8 ${skinId === "neocities" ? "grid-bg" : ""}`}
              >
                {/* Top "window" */}
                <div className={`panel ui max-w-6xl mx-auto ${skinId === "terminal" ? "crt" : ""}`}>
                  <div className="titlebar">
                    <div>CRIX WEBSITE — MS PAINT MODE</div>
                    <div className="win-controls">
                      <div className="win-btn" />
                      <div className="win-btn" />
                      <div className="win-btn" />
                    </div>
                  </div>

                  <div className="p-3 border-b" style={{ borderColor: "var(--borderDark)" }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="bevel px-3 py-2" style={{ fontSize: 12 }}>
                          CRIX.DEV
                        </div>
                        <div className="bevel-inset px-3 py-2" style={{ fontSize: 12 }}>
                          A SKINNED UI FRAMEWORK
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <a className="bevel btn" href="/docs">
                          DOCS
                        </a>
                        <a className="bevel btn" href="/builder">
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

                  {skinId === "neocities" && (
                      <div className="marquee ui" style={{ fontSize: 12 }}>
                  <span>
                    WELCOME TO CRIX • BEST VIEWED IN 1024x768 • CLICK EVERYTHING • SIGN MY GUESTBOOK
                    • DOWNLOAD NOW •
                  </span>
                      </div>
                  )}

                  {/* Content area */}
                  <div className="p-4 md:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Left big window */}
                      <div className="lg:col-span-2">
                        <div className="panel">
                          <div className="titlebar">
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
                                Swap skins. Ship vibes.
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
                                    href="/builder"
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

                      {/* Right sidebar */}
                      <div className="space-y-4">
                        <div className="panel">
                          <div className="titlebar">
                            <div>WHY</div>
                            <div className="win-controls">
                              <div className="win-btn" />
                              <div className="win-btn" />
                              <div className="win-btn" />
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="bevel-inset p-3" style={{ fontSize: 13, lineHeight: 1.35 }}>
                              Most UI kits hardcode a vibe.
                              <br />
                              Crix ships a vibe engine.
                              <br />
                              If your app needs skins, Crix is the point.
                            </div>
                          </div>
                        </div>

                        <div className="panel">
                          <div className="titlebar">
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
                          <div className="titlebar">
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

                    {/* Footer */}
                    <div className="mt-6 panel">
                      <div className="p-3 ui" style={{ fontSize: 12 }}>
                        © 2025 CRIX • THIS PAGE IS INTENTIONALLY UGLY •{" "}
                        <a href="/docs">DOCS</a> • <a href="/builder">BUILDER</a>
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
