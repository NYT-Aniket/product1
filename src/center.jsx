import React, { useState, useRef, useEffect } from "react";
import DATA, { TABS } from "../data.js";

const POPUP_W = 300;
const POPUP_H = 430;

export default function App() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const listRef = useRef(null);
  const popupRef = useRef(null);

  const sx = useRef(0), sy = useRef(0);
  const tx = useRef(0), ty = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const tick = () => {
      sx.current += (tx.current - sx.current) * 0.13;
      sy.current += (ty.current - sy.current) * 0.13;
      if (popupRef.current) {
        popupRef.current.style.transform = `translate(${sx.current + 28}px, ${sy.current - POPUP_H * 0.55}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const handleMouseMove = (e) => {
    tx.current = e.clientX;
    ty.current = e.clientY;
  };

  const handleTab = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setHoveredIdx(null);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const items = DATA[activeTab];
  const hoveredItem = hoveredIdx !== null ? items[hoveredIdx] : null;
  const showPopup = !!hoveredItem?.photo;

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ width: "100vw", height: "100dvh", display: "flex", overflow: "hidden", background: "#f5f4f0" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; box-sizing: border-box; }

        @keyframes popIn {
          from { opacity: 0; scale: 0.87; }
          to   { opacity: 1; scale: 1; }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .list-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition:
            background 0.18s ease,
            box-shadow 0.18s ease,
            opacity 0.2s ease,
            transform 0.15s ease;
          animation: rowIn 0.28s ease both;
          font-family: 'DM Sans', -apple-system, sans-serif;
          /* subtle border always present but invisible until hover */
          border: 1px solid transparent;
        }

        .list-row:hover {
          background: #ffffff;
          border-color: rgba(0,0,0,0.06);
          box-shadow:
            0 1px 3px rgba(0,0,0,0.06),
            0 4px 16px rgba(0,0,0,0.07),
            0 1px 0px rgba(255,255,255,0.9) inset;
          transform: scale(1.012);
        }

        .list-row:active {
          transform: scale(0.985);
          box-shadow:
            0 1px 2px rgba(0,0,0,0.05),
            0 2px 8px rgba(0,0,0,0.06);
          transition-duration: 0.08s;
        }

        .list-row.dimmed {
          opacity: 0.22;
        }
      `}</style>

      {/* ── LEFT: scrollable list ── */}
      <div
        ref={listRef}
        style={{
          width: "60%", height: "100%",
          overflowY: "auto", overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          fontFamily: "'DM Sans', -apple-system, sans-serif",
        }}
      >
        {/* outer padding; rows themselves get horizontal padding from className */}
        <div style={{ padding: "188px 24px 80px 26vh", maxWidth: 720 }}>
          {items.map((item, i) => {
            const isContact = activeTab === "Contact";
            const isClickable = !!item.url;
            const isDimmed = hoveredIdx !== null && hoveredIdx !== i;

            return (
              <div
                key={`${activeTab}-${i}`}
                className={`list-row${isDimmed ? " dimmed" : ""}`}
                style={{ animationDelay: `${i * 30}ms` }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => { if (item.url) window.open(item.url, "_blank", "noopener noreferrer"); }}
              >
                {/* left: name */}
                <div>
                  <span style={{
                    fontSize: 19.5, fontWeight: 400, color: "#111",
                    letterSpacing: "-0.015em", display: "block",
                  }}>
                    {isContact ? item.label : item.name}
                  </span>
                  {isContact && (
                    <span style={{
                      fontSize: 19.5, color: "#bbb", fontWeight: 300,
                      display: "block", marginTop: 1, letterSpacing: "-0.005em",
                    }}>
                      {item.name}
                    </span>
                  )}
                </div>

                {/* right: year + arrow */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {item.year && (
                    <span style={{
                      fontSize: 19.5, color: "#c8c8c8",
                      fontVariantNumeric: "tabular-nums", fontWeight: 300,
                    }}>
                      {item.year}
                    </span>
                  )}
                  {isClickable && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.22 }}>
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#111" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: identity panel ── */}
      <div style={{
        width: "45%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "flex-start",
        padding: "0 64px",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}>
        <div>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", overflow: "hidden",
            marginBottom: 22,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.07)",
          }}>
            <img
              src="https://thumbs.dreamstime.com/b/square-frame-beautiful-nature-scenery-close-up-dandelion-against-cloudy-blue-sky-white-flower-blooms-amid-green-154769697.jpg"
              alt="Aniket"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 500, color: "#0d0d0d", letterSpacing: "-0.03em", lineHeight: 1.25, margin: "0 0 6px" }}>
            Aniket Patel,
          </h1>

          <p style={{ fontSize: 17, fontWeight: 300, color: "#0d0d0d", letterSpacing: "-0.015em", lineHeight: 1.4, margin: "0 0 30px" }}>
            Code to understand how{" "}
            <span style={{
              background: "linear-gradient(135deg,#ec4899,#a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>things</span>{" "}work
          </p>

          <nav style={{ display: "flex", gap: 22 }}>
            {TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button key={tab} onClick={() => handleTab(tab)} style={{
                  background: "none", border: "none", padding: "0 0 2px",
                  cursor: "pointer", fontFamily: "inherit",
                  fontSize: 15, fontWeight: 400,
                  color: active ? "#0d0d0d" : "#c8c8c8",
                  borderBottom: `1.5px solid ${active ? "#0d0d0d" : "transparent"}`,
                  transition: "color 0.18s, border-color 0.18s",
                  userSelect: "none", letterSpacing: "-0.01em",
                  WebkitTapHighlightColor: "transparent",
                }}>
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Popup: anchored at 0,0 moved via transform only ── */}
      <div
        ref={popupRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: POPUP_W, height: POPUP_H,
          borderRadius: 22, overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.24), 0 8px 28px rgba(0,0,0,0.10)",
          pointerEvents: "none",
          zIndex: 100,
          willChange: "transform",
          opacity: showPopup ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {hoveredItem?.photo && (
          <>
            <img
              key={hoveredItem.photo}
              src={hoveredItem.photo} alt=""
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                animation: "popIn 0.22s cubic-bezier(0.32,0.72,0,1) both",
              }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 52%)" }} />
            <div style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
              <p style={{ color: "#fff", fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.015em", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                {hoveredItem.name}
              </p>
              {hoveredItem.year && (
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "3px 0 0", fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}>
                  {hoveredItem.year}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}