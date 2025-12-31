"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type SkinId = "y2k" | "terminal" | "dark" | "neocities";

type Skin = {
  id: SkinId;
  name: string;
  vars: Record<string, string>;
  background: string; // page background behind everything
  heroOverlay: string; // overlay on top of hero image
  showNoise?: boolean;
  scanlines?: boolean;
  tileBg?: boolean;
};

const SKINS: Record<SkinId, Skin> = {
  y2k: {
    id: "y2k",
    name: "Y2K Aqua",
    vars: {
      "--ink": "#0b2a4a",
      "--ink2": "rgba(11,42,74,0.78)",
      "--chromeTop": "rgba(255,255,255,0.92)",
      "--chromeMid": "rgba(255,255,255,0.68)",
      "--chromeLow": "rgba(210,240,255,0.62)",
      "--chromeBot": "rgba(255,255,255,0.86)",
      "--line": "rgba(255,255,255,0.78)",
      "--shadow": "rgba(0,0,0,0.12)",
      "--accent1": "#2ee7d1",
      "--accent2": "#63b7ff",
      "--accent3": "#3f7dff",
      "--mutedBg": "#f2f8ff",
      "--pillTop": "rgba(255,255,255,0.92)",
      "--pillMid": "rgba(255,255,255,0.64)",
      "--pillBot": "rgba(255,255,255,0.40)",
      "--noiseOpacity": "0.26",
    },
    background: "linear-gradient(180deg, #f2f8ff 0%, #eafcff 50%, #f6fffb 100%)",
    heroOverlay:
        "radial-gradient(circle at 20% 25%, rgba(46,231,209,0.42) 0%, transparent 55%)," +
        "radial-gradient(circle at 75% 30%, rgba(99,183,255,0.45) 0%, transparent 55%)," +
        "linear-gradient(135deg, rgba(63,125,255,0.66) 0%, rgba(11,42,74,0.50) 42%, rgba(191,255,231,0.22) 100%)",
    showNoise: true,
  },

  terminal: {
    id: "terminal",
    name: "Terminal",
    vars: {
      "--ink": "#b7ffcf",
      "--ink2": "rgba(183,255,207,0.75)",
      "--chromeTop": "rgba(3,12,8,0.92)",
      "--chromeMid": "rgba(3,12,8,0.75)",
      "--chromeLow": "rgba(4,16,10,0.72)",
      "--chromeBot": "rgba(2,10,7,0.92)",
      "--line": "rgba(183,255,207,0.22)",
      "--shadow": "rgba(0,0,0,0.35)",
      "--accent1": "#20ff8a",
      "--accent2": "#00d07a",
      "--accent3": "#a8ff2a",
      "--mutedBg": "#020a07",
      "--pillTop": "rgba(3,12,8,0.92)",
      "--pillMid": "rgba(3,12,8,0.70)",
      "--pillBot": "rgba(2,10,7,0.92)",
      "--noiseOpacity": "0.18",
    },
    background:
        "radial-gradient(circle at 30% 20%, rgba(32,255,138,0.12) 0%, transparent 50%)," +
        "linear-gradient(180deg, #020a07 0%, #010604 100%)",
    heroOverlay:
        "radial-gradient(circle at 20% 25%, rgba(32,255,138,0.18) 0%, transparent 55%)," +
        "linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,14,8,0.74) 55%, rgba(32,255,138,0.10) 100%)",
    showNoise: true,
    scanlines: true,
  },

  dark: {
    id: "dark",
    name: "Dark Glass",
    vars: {
      "--ink": "#e9f2ff",
      "--ink2": "rgba(233,242,255,0.75)",
      "--chromeTop": "rgba(18,22,32,0.82)",
      "--chromeMid": "rgba(18,22,32,0.66)",
      "--chromeLow": "rgba(18,22,32,0.62)",
      "--chromeBot": "rgba(18,22,32,0.82)",
      "--line": "rgba(255,255,255,0.12)",
      "--shadow": "rgba(0,0,0,0.45)",
      "--accent1": "#7dd3fc",
      "--accent2": "#34d399",
      "--accent3": "#a78bfa",
      "--mutedBg": "#0b0f18",
      "--pillTop": "rgba(255,255,255,0.10)",
      "--pillMid": "rgba(255,255,255,0.06)",
      "--pillBot": "rgba(255,255,255,0.10)",
      "--noiseOpacity": "0.14",
    },
    background:
        "radial-gradient(circle at 20% 20%, rgba(125,211,252,0.12) 0%, transparent 55%)," +
        "radial-gradient(circle at 75% 35%, rgba(52,211,153,0.10) 0%, transparent 60%)," +
        "linear-gradient(180deg, #0b0f18 0%, #070a10 100%)",
    heroOverlay:
        "radial-gradient(circle at 25% 25%, rgba(125,211,252,0.20) 0%, transparent 60%)," +
        "linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(11,15,24,0.72) 55%, rgba(167,139,250,0.10) 100%)",
    showNoise: false,
  },

  neocities: {
    id: "neocities",
    name: "Neocities",
    vars: {
      "--ink": "#0b1c2a",
      "--ink2": "rgba(11,28,42,0.78)",
      "--chromeTop": "rgba(255,255,255,0.88)",
      "--chromeMid": "rgba(255,255,255,0.62)",
      "--chromeLow": "rgba(255,255,255,0.55)",
      "--chromeBot": "rgba(255,255,255,0.82)",
      "--line": "rgba(0,0,0,0.10)",
      "--shadow": "rgba(0,0,0,0.18)",
      "--accent1": "#00c2ff",
      "--accent2": "#00ff9d",
      "--accent3": "#ffd000",
      "--mutedBg": "#f7fff6",
      "--pillTop": "rgba(255,255,255,0.92)",
      "--pillMid": "rgba(255,255,255,0.70)",
      "--pillBot": "rgba(255,255,255,0.50)",
      "--noiseOpacity": "0.18",
    },
    background:
        "linear-gradient(180deg, rgba(247,255,246,1) 0%, rgba(235,252,255,1) 55%, rgba(255,252,234,1) 100%)",
    heroOverlay:
        "radial-gradient(circle at 15% 25%, rgba(0,194,255,0.35) 0%, transparent 55%)," +
        "radial-gradient(circle at 80% 30%, rgba(0,255,157,0.22) 0%, transparent 60%)," +
        "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(11,28,42,0.42) 50%, rgba(255,208,0,0.10) 100%)",
    showNoise: false,
    tileBg: true,
  },
};

function getInitialSkin(): SkinId {
  if (typeof window === "undefined") return "y2k";
  const saved = window.localStorage.getItem("crix-skin") as SkinId | null;
  return saved && SKINS[saved] ? saved : "y2k";
}

export default function Page() {
  const [skinId, setSkinId] = useState<SkinId>("y2k");
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

  const cssVars = useMemo(() => skin.vars as React.CSSProperties, [skin]);

  return (
      <div
          className="min-h-screen w-full"
          style={{
            ...(cssVars as any),
            background: skin.background,
          }}
      >
        <style>{`
        .y2k-noise {
          background-image:
            radial-gradient(circle at 12% 15%, rgba(255,255,255,0.20) 0%, transparent 40%),
            radial-gradient(circle at 88% 18%, rgba(255,255,255,0.15) 0%, transparent 45%),
            radial-gradient(circle at 30% 85%, rgba(255,255,255,0.12) 0%, transparent 50%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px);
          mix-blend-mode: overlay;
          opacity: var(--noiseOpacity, 0.22);
          pointer-events: none;
        }

        .scanlines::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.0) 0px,
            rgba(0,0,0,0.0) 2px,
            rgba(0,0,0,0.16) 3px,
            rgba(0,0,0,0.0) 4px
          );
          opacity: 0.22;
          mix-blend-mode: multiply;
        }

        .chrome {
          background:
            linear-gradient(180deg,
              var(--chromeTop) 0%,
              var(--chromeMid) 40%,
              var(--chromeLow) 60%,
              var(--chromeBot) 100%);
          border: 1px solid var(--line);
          box-shadow:
            0 14px 40px var(--shadow),
            inset 0 2px 0 rgba(255,255,255,0.28);
          backdrop-filter: blur(14px);
        }

        .glossy-pill {
          background:
            linear-gradient(180deg,
              var(--pillTop) 0%,
              var(--pillMid) 55%,
              var(--pillBot) 100%);
          border: 1px solid var(--line);
          box-shadow:
            0 10px 18px rgba(0,0,0,0.10),
            inset 0 1px 0 rgba(255,255,255,0.24);
        }

        .tile-bg {
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.20;
          pointer-events: none;
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
                        "radial-gradient(circle at 16% 22%, color-mix(in srgb, var(--accent2) 55%, transparent) 0%, transparent 48%)," +
                        "radial-gradient(circle at 82% 30%, color-mix(in srgb, var(--accent1) 45%, transparent) 0%, transparent 52%)," +
                        "linear-gradient(135deg, var(--accent3) 0%, var(--accent2) 45%, var(--accent1) 100%)",
                  }}
              >
                {skin.showNoise && <div className="absolute inset-0 y2k-noise" />}
                {skin.scanlines && <div className="absolute inset-0 scanlines" />}
                {skin.tileBg && <div className="absolute inset-0 tile-bg" />}

                <div className="relative z-10 w-full max-w-lg px-8">
                  <div className="chrome rounded-[28px] p-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ rotate: -10, scale: 0.92, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 140, damping: 14 }}
                            className="w-14 h-14 rounded-2xl relative"
                            style={{
                              background:
                                  "linear-gradient(135deg, var(--accent2) 0%, var(--accent3) 45%, var(--accent1) 100%)",
                              boxShadow:
                                  "0 14px 28px rgba(0,0,0,0.14), inset 0 2px 0 rgba(255,255,255,0.30)",
                            }}
                        >
                          <div className="absolute inset-2 rounded-xl border border-white/30" />
                        </motion.div>

                        <div>
                          <div
                              className="text-5xl leading-none"
                              style={{
                                fontFamily: "Trebuchet MS, sans-serif",
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                color: "var(--ink)",
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
                            skin-first • cross-platform
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
                        {skin.name}
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
                              background: "color-mix(in srgb, var(--accent2) 18%, transparent)",
                              border: "1px solid var(--line)",
                            }}
                        >
                          <div
                              className="absolute inset-y-0 left-0 rounded-xl"
                              style={{
                                width: `${progress}%`,
                                background:
                                    "linear-gradient(90deg, var(--accent1) 0%, var(--accent2) 40%, var(--accent3) 100%)",
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
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                                opacity: 0.8,
                              }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div
                            className="px-3 py-2 rounded-full glossy-pill"
                            style={{ fontFamily: "Tahoma, sans-serif", fontSize: 12, color: "var(--ink2)" }}
                        >
                          boot.exe
                        </div>
                        <div
                            className="px-3 py-2 rounded-full glossy-pill"
                            style={{ fontFamily: "Tahoma, sans-serif", fontSize: 12, color: "var(--ink2)" }}
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
                          color: "color-mix(in srgb, var(--ink) 55%, transparent)",
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
              >
                {/* Header */}
                <div className="fixed top-0 left-0 right-0 z-50">
                  <div
                      className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between"
                      style={{
                        background:
                            "linear-gradient(90deg, color-mix(in srgb, var(--accent2) 35%, transparent) 0%, color-mix(in srgb, var(--accent1) 30%, transparent) 55%, color-mix(in srgb, var(--accent3) 18%, transparent) 100%)",
                        borderBottom: "1px solid var(--line)",
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
                                "linear-gradient(135deg, var(--accent2) 0%, var(--accent3) 45%, var(--accent1) 100%)",
                            boxShadow:
                                "0 12px 24px rgba(0,0,0,0.12), inset 0 2px 0 rgba(255,255,255,0.25)",
                          }}
                      >
                        <div className="absolute inset-1.5 rounded-xl border border-white/20" />
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
                      <a
                          href="/docs"
                          className="px-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-[0.99]"
                          style={{
                            fontFamily: "Tahoma, sans-serif",
                            fontSize: 13,
                            color: "var(--ink)",
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.55) 100%)",
                            border: "1px solid var(--line)",
                            boxShadow:
                                "0 10px 18px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.22)",
                          }}
                      >
                        Docs
                      </a>
                      <a
                          href="/builder"
                          className="px-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-[0.99]"
                          style={{
                            fontFamily: "Tahoma, sans-serif",
                            fontSize: 13,
                            color: "var(--ink)",
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.55) 100%)",
                            border: "1px solid var(--line)",
                            boxShadow:
                                "0 10px 18px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.22)",
                          }}
                      >
                        Builder
                      </a>

                      {/* Skin toggle */}
                      <div className="ml-2 flex items-center gap-2">
                        <div
                            className="px-3 py-2 rounded-full glossy-pill"
                            style={{
                              fontFamily: "Tahoma, sans-serif",
                              fontSize: 12,
                              color: "var(--ink2)",
                            }}
                        >
                          Skin
                        </div>

                        <select
                            value={skinId}
                            onChange={(e) => setSkinId(e.target.value as SkinId)}
                            className="px-4 py-2 rounded-full outline-none"
                            style={{
                              fontFamily: "Tahoma, sans-serif",
                              fontSize: 13,
                              color: "var(--ink)",
                              background:
                                  "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.55) 100%)",
                              border: "1px solid var(--line)",
                              boxShadow:
                                  "0 10px 18px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.22)",
                            }}
                        >
                          <option value="y2k">Y2K Aqua</option>
                          <option value="terminal">Terminal</option>
                          <option value="dark">Dark Glass</option>
                          <option value="neocities">Neocities</option>
                        </select>
                      </div>
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
                    <div className="absolute inset-0" style={{ background: skin.heroOverlay }} />
                    {skin.showNoise && <div className="absolute inset-0 y2k-noise" />}
                    {skin.scanlines && <div className="absolute inset-0 scanlines" />}
                    {skin.tileBg && <div className="absolute inset-0 tile-bg" />}
                  </div>

                  <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                    <motion.div
                        initial={{ y: 22, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
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
                      {skin.name}
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
                              border: "1px solid rgba(255,255,255,0.35)",
                              boxShadow:
                                  "0 18px 40px rgba(0,0,0,0.16), inset 0 2px 0 rgba(255,255,255,0.22)",
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
                                  "linear-gradient(90deg, var(--accent1) 0%, var(--accent2) 40%, var(--accent3) 100%)",
                              border: "1px solid rgba(255,255,255,0.25)",
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

                {/* Explanation */}
                <div className="relative">
                  {skin.tileBg && <div className="absolute inset-0 tile-bg" />}
                  <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                    >
                      <div className="chrome rounded-[30px] p-10 relative overflow-hidden">
                        {skin.showNoise && <div className="absolute inset-0 y2k-noise" />}
                        {skin.scanlines && <div className="absolute inset-0 scanlines" />}
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
                                      border: "1px solid rgba(255,255,255,0.25)",
                                      boxShadow:
                                          "0 10px 18px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.18)",
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
                              {skin.showNoise && <div className="absolute inset-0 y2k-noise" />}
                              {skin.scanlines && <div className="absolute inset-0 scanlines" />}
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
                        © 2025{" "}
                        <span style={{ fontWeight: 800, color: "var(--ink)" }}>Crix</span>
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
