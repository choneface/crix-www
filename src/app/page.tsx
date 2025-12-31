"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    let done = false;

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (!done) {
            done = true;
            window.clearInterval(timer);
            window.setTimeout(() => setShowSplash(false), 450);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 28);

    return () => window.clearInterval(timer);
  }, []);

  const statusText = useMemo(() => {
    if (progress < 25) return "Warming up…";
    if (progress < 55) return "Loading UI chrome…";
    if (progress < 85) return "Tuning gradients…";
    if (progress < 100) return "Almost ready…";
    return "Ready.";
  }, [progress]);

  return (
      <div className="min-h-screen w-full">
        <style>{`
        :root{
          --ink: #0b2a4a;
          --ink2: rgba(11,42,74,0.78);
          --glass: rgba(255,255,255,0.62);
          --glass2: rgba(255,255,255,0.42);
          --line: rgba(255,255,255,0.72);
          --shadow: rgba(0,0,0,0.14);
          --blue1: #63b7ff;
          --blue2: #3f7dff;
          --teal1: #2ee7d1;
          --teal2: #1fb2c8;
          --mint: #bfffe7;
          --lilac: rgba(170,190,255,0.22);
        }

        .y2k-noise {
          background-image:
            radial-gradient(circle at 12% 15%, rgba(255,255,255,0.20) 0%, transparent 40%),
            radial-gradient(circle at 88% 18%, rgba(255,255,255,0.15) 0%, transparent 45%),
            radial-gradient(circle at 30% 85%, rgba(255,255,255,0.12) 0%, transparent 50%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px);
          mix-blend-mode: overlay;
          opacity: 0.28;
          pointer-events: none;
        }

        .chrome {
          background:
            linear-gradient(180deg,
              rgba(255,255,255,0.92) 0%,
              rgba(255,255,255,0.68) 40%,
              rgba(210,240,255,0.62) 60%,
              rgba(255,255,255,0.86) 100%);
          border: 1px solid rgba(255,255,255,0.82);
          box-shadow:
            0 14px 40px rgba(0,0,0,0.14),
            inset 0 2px 0 rgba(255,255,255,0.92),
            inset 0 -10px 22px rgba(99,183,255,0.10);
          backdrop-filter: blur(14px);
        }

        .glossy-pill {
          background:
            linear-gradient(180deg,
              rgba(255,255,255,0.92) 0%,
              rgba(255,255,255,0.64) 55%,
              rgba(255,255,255,0.40) 100%);
          border: 1px solid rgba(255,255,255,0.82);
          box-shadow:
            0 10px 22px rgba(0,0,0,0.10),
            inset 0 1px 0 rgba(255,255,255,0.92);
        }

        .soft-ring {
          box-shadow:
            0 18px 60px rgba(0,0,0,0.14),
            0 0 0 1px rgba(255,255,255,0.35) inset;
        }
      `}</style>

        <AnimatePresence mode="wait">
          {showSplash ? (
              <motion.div
                  key="splash"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65 }}
                  className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                        "radial-gradient(circle at 16% 22%, rgba(99,183,255,0.55) 0%, transparent 48%)," +
                        "radial-gradient(circle at 82% 30%, rgba(46,231,209,0.45) 0%, transparent 52%)," +
                        "linear-gradient(135deg, #2d6dd8 0%, #2bb5c8 45%, #bfffe7 100%)",
                  }}
              >
                <div className="absolute inset-0 y2k-noise" />

                {/* gentle blobs */}
                <motion.div
                    className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-25"
                    animate={{ y: [0, 14, 0], x: [0, 8, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity }}
                    style={{
                      background:
                          "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 65%)",
                      filter: "blur(16px)",
                    }}
                />
                <motion.div
                    className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full opacity-20"
                    animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
                    transition={{ duration: 8.2, repeat: Infinity }}
                    style={{
                      background:
                          "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.0) 70%)",
                      filter: "blur(18px)",
                    }}
                />

                <div className="relative z-10 w-full max-w-lg px-8">
                  <div className="chrome rounded-[28px] p-10 soft-ring">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ rotate: -14, scale: 0.92, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 140, damping: 14 }}
                            className="w-14 h-14 rounded-2xl relative"
                            style={{
                              background:
                                  "linear-gradient(135deg, #63b7ff 0%, #3f7dff 45%, #2ee7d1 100%)",
                              boxShadow:
                                  "0 14px 28px rgba(0,0,0,0.14), inset 0 2px 0 rgba(255,255,255,0.55)",
                            }}
                        >
                          <div
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(255,255,255,0.12) 100%)",
                              }}
                          />
                          <div className="absolute inset-2 rounded-xl border border-white/50" />
                        </motion.div>

                        <div>
                          <div
                              className="text-5xl leading-none"
                              style={{
                                fontFamily: "Trebuchet MS, sans-serif",
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                color: "var(--ink)",
                                textShadow: "0 2px 0 rgba(255,255,255,0.65)",
                              }}
                          >
                            Crix
                          </div>
                          <div
                              className="mt-1"
                              style={{
                                fontFamily: "Tahoma, sans-serif",
                                fontSize: 13,
                                color: "var(--ink2)",
                              }}
                          >
                            skin-first • cross-platform • glossy UI
                          </div>
                        </div>
                      </div>

                      <div
                          className="px-4 py-2 rounded-full glossy-pill"
                          style={{
                            fontFamily: "Tahoma, sans-serif",
                            fontSize: 12,
                            color: "var(--ink2)",
                          }}
                      >
                        booting
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div
                          className="text-center"
                          style={{
                            fontFamily: "Tahoma, sans-serif",
                            fontSize: 13,
                            color: "var(--ink2)",
                          }}
                      >
                        {statusText}
                      </div>

                      <div className="rounded-2xl p-2 glossy-pill">
                        <div
                            className="h-5 rounded-xl overflow-hidden relative"
                            style={{
                              background: "rgba(99,183,255,0.16)",
                              border: "1px solid rgba(255,255,255,0.65)",
                            }}
                        >
                          <div
                              className="absolute inset-y-0 left-0 rounded-xl"
                              style={{
                                width: `${progress}%`,
                                background:
                                    "linear-gradient(90deg, #2ee7d1 0%, #63b7ff 35%, #3f7dff 70%, #bfffe7 100%)",
                                transition: "width 0.08s linear",
                                boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
                              }}
                          />
                          <motion.div
                              className="absolute inset-0"
                              animate={{ x: ["-45%", "125%"] }}
                              transition={{ duration: 1.55, repeat: Infinity, ease: "linear" }}
                              style={{
                                width: "40%",
                                background:
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                                opacity: 0.8,
                              }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div
                            className="px-3 py-2 rounded-full glossy-pill"
                            style={{
                              fontFamily: "Tahoma, sans-serif",
                              fontSize: 12,
                              color: "var(--ink2)",
                            }}
                        >
                          boot.exe
                        </div>
                        <div
                            className="px-3 py-2 rounded-full glossy-pill"
                            style={{
                              fontFamily: "Tahoma, sans-serif",
                              fontSize: 12,
                              color: "var(--ink2)",
                            }}
                        >
                          {progress}%
                        </div>
                      </div>
                    </div>

                    <div
                        className="mt-8 text-center"
                        style={{
                          fontFamily: "Tahoma, sans-serif",
                          fontSize: 11,
                          color: "rgba(11,42,74,0.55)",
                        }}
                    >
                      © 2025 Crix Framework
                    </div>
                  </div>
                </div>
              </motion.div>
          ) : (
              <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="min-h-screen w-full overflow-y-auto"
                  style={{ background: "#f2f8ff" }}
              >
                {/* Header */}
                <div className="fixed top-0 left-0 right-0 z-50">
                  <div
                      className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between"
                      style={{
                        background:
                            "linear-gradient(90deg, rgba(99,183,255,0.42) 0%, rgba(46,231,209,0.38) 45%, rgba(191,255,231,0.36) 100%)",
                        borderBottom: "1px solid rgba(255,255,255,0.68)",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
                        backdropFilter: "blur(14px)",
                        borderRadius: 22,
                        marginTop: 14,
                      }}
                  >
                    <a href="/" className="flex items-center gap-3">
                      <div
                          className="w-10 h-10 rounded-2xl relative"
                          style={{
                            background:
                                "linear-gradient(135deg, #63b7ff 0%, #3f7dff 45%, #2ee7d1 100%)",
                            boxShadow:
                                "0 12px 24px rgba(0,0,0,0.12), inset 0 2px 0 rgba(255,255,255,0.55)",
                          }}
                      >
                        <div className="absolute inset-1.5 rounded-xl border border-white/55" />
                      </div>
                      <div>
                        <div
                            style={{
                              fontFamily: "Trebuchet MS, sans-serif",
                              fontWeight: 900,
                              color: "var(--ink)",
                              lineHeight: 1,
                            }}
                        >
                          Crix
                        </div>
                        <div
                            style={{
                              fontFamily: "Tahoma, sans-serif",
                              fontSize: 12,
                              color: "var(--ink2)",
                            }}
                        >
                          UI Framework
                        </div>
                      </div>
                    </a>

                    <nav className="flex items-center gap-2">
                      {[
                        { label: "Docs", href: "/docs" },
                        { label: "Builder", href: "/builder" },
                      ].map((item) => (
                          <a
                              key={item.label}
                              href={item.href}
                              className="px-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-[0.99]"
                              style={{
                                fontFamily: "Tahoma, sans-serif",
                                fontSize: 13,
                                color: "var(--ink)",
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.55) 100%)",
                                border: "1px solid rgba(255,255,255,0.82)",
                                boxShadow:
                                    "0 10px 18px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.92)",
                              }}
                          >
                            {item.label}
                          </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Hero */}
                <div className="relative min-h-screen overflow-hidden pt-28">
                  <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1761652661873-a08d8cb25b66?auto=format&fit=crop&w=1920&q=80"
                        alt="Crix Background"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                          background:
                              "radial-gradient(circle at 20% 25%, rgba(46,231,209,0.42) 0%, transparent 55%)," +
                              "radial-gradient(circle at 75% 30%, rgba(99,183,255,0.45) 0%, transparent 55%)," +
                              "linear-gradient(135deg, rgba(63,125,255,0.66) 0%, rgba(11,42,74,0.50) 42%, rgba(191,255,231,0.22) 100%)",
                        }}
                    />
                    <div className="absolute inset-0 y2k-noise" />
                  </div>

                  <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                    <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.65 }}
                        className="max-w-3xl"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full chrome">
                    <span
                        style={{
                          fontFamily: "Tahoma, sans-serif",
                          fontSize: 12,
                          color: "var(--ink2)",
                        }}
                    >
                      glossy • chrome • skins
                    </span>
                      </div>

                      <h1
                          className="mt-6 text-6xl md:text-7xl"
                          style={{
                            fontFamily: "Trebuchet MS, sans-serif",
                            fontWeight: 900,
                            letterSpacing: "-0.03em",
                            color: "#ffffff",
                            textShadow:
                                "0 10px 40px rgba(0,0,0,0.32), 0 3px 10px rgba(0,0,0,0.22)",
                          }}
                      >
                        Crix UI Framework
                      </h1>

                      <p
                          className="mt-6 text-xl md:text-2xl max-w-2xl"
                          style={{
                            fontFamily: "Tahoma, sans-serif",
                            color: "rgba(255,255,255,0.92)",
                            lineHeight: 1.65,
                            textShadow: "0 2px 10px rgba(0,0,0,0.30)",
                          }}
                      >
                        A skin-first, cross-platform UI framework for glossy desktop vibes —
                        with modern ergonomics and a builder-friendly architecture.
                      </p>

                      <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <motion.a
                            href="/docs"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.99 }}
                            className="inline-flex items-center justify-center px-7 py-4 rounded-full"
                            style={{
                              fontFamily: "Trebuchet MS, sans-serif",
                              fontWeight: 800,
                              color: "var(--ink)",
                              background:
                                  "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.70) 100%)",
                              border: "1px solid rgba(255,255,255,0.9)",
                              boxShadow:
                                  "0 18px 40px rgba(0,0,0,0.16), inset 0 2px 0 rgba(255,255,255,0.92)",
                            }}
                        >
                          Read the Docs
                        </motion.a>

                        <motion.a
                            href="/builder"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.99 }}
                            className="inline-flex items-center justify-center px-7 py-4 rounded-full"
                            style={{
                              fontFamily: "Trebuchet MS, sans-serif",
                              fontWeight: 800,
                              color: "#ffffff",
                              background:
                                  "linear-gradient(90deg, rgba(46,231,209,0.92) 0%, rgba(99,183,255,0.92) 40%, rgba(63,125,255,0.92) 100%)",
                              border: "1px solid rgba(255,255,255,0.40)",
                              boxShadow: "0 20px 44px rgba(0,0,0,0.18)",
                              textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                            }}
                        >
                          Open Builder
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Explanation section */}
                <div
                    style={{
                      background:
                          "radial-gradient(circle at 18% 18%, rgba(46,231,209,0.12) 0%, transparent 60%)," +
                          "radial-gradient(circle at 82% 25%, rgba(99,183,255,0.12) 0%, transparent 60%)," +
                          "linear-gradient(180deg, #f2f8ff 0%, #eafcff 50%, #f6fffb 100%)",
                    }}
                >
                  <div className="max-w-7xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                    >
                      <div className="chrome rounded-[30px] p-10 relative overflow-hidden">
                        <div className="absolute inset-0 y2k-noise" />
                        <div className="relative">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glossy-pill">
                        <span
                            style={{
                              fontFamily: "Tahoma, sans-serif",
                              fontSize: 12,
                              color: "var(--ink2)",
                            }}
                        >
                          What is Crix?
                        </span>
                          </div>

                          <h2
                              className="mt-5 text-4xl"
                              style={{
                                fontFamily: "Trebuchet MS, sans-serif",
                                fontWeight: 900,
                                color: "var(--ink)",
                              }}
                          >
                            Skin-first UI, by design
                          </h2>

                          <p
                              className="mt-4 text-lg"
                              style={{
                                fontFamily: "Tahoma, sans-serif",
                                color: "var(--ink2)",
                                lineHeight: 1.75,
                              }}
                          >
                            Crix treats the visual layer as data: palettes, materials, borders,
                            highlights, and layout rules are all part of the “skin.”
                            You can ship radically different looks without rewriting component logic.
                          </p>

                          <div className="mt-7 flex flex-wrap gap-2">
                            {[
                              "Themes as data",
                              "Chrome + glass materials",
                              "Predictable layout",
                              "Micro-motion (optional)",
                              "Builder-ready output",
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 rounded-full"
                                    style={{
                                      fontFamily: "Tahoma, sans-serif",
                                      fontSize: 12,
                                      color: "var(--ink)",
                                      background:
                                          "linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.58) 100%)",
                                      border: "1px solid rgba(255,255,255,0.85)",
                                      boxShadow:
                                          "0 10px 18px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.92)",
                                    }}
                                >
                            {tag}
                          </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Skin-first",
                            desc:
                                "Swap the vibe with a skin file: colors, materials, and affordances.",
                          },
                          {
                            title: "Builder",
                            desc:
                                "A visual editor that generates real projects you can commit and ship.",
                          },
                          {
                            title: "Cross-platform",
                            desc:
                                "One UI tree with consistent rendering and input behavior across targets.",
                          },
                          {
                            title: "Delight",
                            desc:
                                "Gloss, depth, and subtle motion—enabled when you want it.",
                          },
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ y: 14, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06, duration: 0.45 }}
                                className="chrome rounded-[26px] p-7 relative overflow-hidden"
                            >
                              <div className="absolute inset-0 y2k-noise" />
                              <div className="relative">
                                <h3
                                    className="text-xl"
                                    style={{
                                      fontFamily: "Trebuchet MS, sans-serif",
                                      fontWeight: 900,
                                      color: "var(--ink)",
                                    }}
                                >
                                  {card.title}
                                </h3>
                                <p
                                    className="mt-2"
                                    style={{
                                      fontFamily: "Tahoma, sans-serif",
                                      fontSize: 13,
                                      color: "var(--ink2)",
                                      lineHeight: 1.6,
                                    }}
                                >
                                  {card.desc}
                                </p>
                              </div>
                            </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <div className="mt-16 text-center">
                      <div
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full chrome"
                          style={{
                            fontFamily: "Tahoma, sans-serif",
                            fontSize: 12,
                            color: "var(--ink2)",
                          }}
                      >
                        © 2025 <span style={{ fontWeight: 800, color: "var(--ink)" }}>Crix</span>
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
