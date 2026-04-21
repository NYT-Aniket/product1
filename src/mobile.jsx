import { useState, useRef, useEffect } from "react";
import DATA, { TABS } from "../data.js";
import firefly from './images/firefly.jpg';

/* ─── PHOTO SHEET MODAL ──────────────────────────────────────────────── */
function PhotoSheet({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: "0 0 20px",
        animation: "bgIn 0.22s ease both",
      }}
    >
      <div style={{
        width: "min(400px, 94vw)",
        background: "#fff",
        borderRadius: 28,
        overflow: "hidden",
        animation: "sheetUp 0.28s cubic-bezier(0.32,0.72,0,1) both",
        boxShadow: "0 -4px 60px rgba(0,0,0,0.18)",
      }}>
        {/* Image */}
        <div style={{ position: "relative" }}>
          <img
            src={item.photo} alt={item.name}
            style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          {/* Close pill */}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(0,0,0,0.48)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "20px 24px 26px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#0d0d0d", letterSpacing: "-0.02em" }}>
                {item.name}
              </p>
              {item.year && (
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#c0c0c0", fontWeight: 300 }}>
                  {item.year}
                </p>
              )}
            </div>
          </div>

          {item.url && (
            <a
              href={item.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 18, padding: "13px 20px",
                background: "#0d0d0d", color: "#fff",
                borderRadius: 14, fontSize: 14, fontWeight: 500,
                textDecoration: "none", letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.78")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View on GitHub
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE COMPONENT ───────────────────────────────────────────────── */
export default function Mobile() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [openItem, setOpenItem]   = useState(null);
  const listRef                   = useRef(null);

  const handleTab = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setOpenItem(null);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const items = DATA[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
        @keyframes fadeRow {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgIn    { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        width: "100vw", height: "100dvh",
        display: "flex", flexDirection: "column", overflow: "hidden",
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div style={{ flexShrink: 0, padding: "52px 32px 24px" }}>
          {/* Avatar */}
          <div style={{
            width: 87, height: 87, borderRadius: "50%", overflow: "hidden",
            marginBottom: 20,
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.07)",
          }}>
            <img
              src={firefly}
              alt="Aniket Patel"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Name */}
          <h1 style={{ fontSize: 28, fontWeight: 500, color: "#0d0d0d", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 5px" }}>
            Aniket Patel,
          </h1>

          {/* Tagline */}
          <p style={{ fontSize: 17, fontWeight: 300, color: "#0d0d0d", letterSpacing: "-0.015em", lineHeight: 1.4, margin: "0 0 26px" }}>
            Code to understand how{" "}
            <span style={{
              background: "linear-gradient(135deg,#ec4899,#a855f7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>things</span>{" "}work
          </p>

          {/* Nav tabs — same horizontal style as original */}
          <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
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

        {/* Divider */}
        <div style={{ flexShrink: 0, height: "0.5px", background: "rgba(0,0,0,0.08)", margin: "0 32px" }} />

        {/* ── LIST ──────────────────────────────────────────────── */}
        <div
          key={activeTab}
          ref={listRef}
          style={{
            flex: 1, minHeight: 0,
            overflowY: "auto", overflowX: "hidden",
            padding: "0 32px 56px",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          {items.map((item, i) => (
            <MobileRow
              key={`${activeTab}-${i}`}
              item={item} index={i} tab={activeTab}
              onTap={() => {
                const isContact = activeTab === "Contact";
                if (isContact && item.url) {
                  window.open(item.url, "_blank", "noopener noreferrer");
                } else if (item.photo) {
                  setOpenItem(item);
                }
              }}
            />
          ))}
        </div>
      </div>

      {openItem && <PhotoSheet item={openItem} onClose={() => setOpenItem(null)} />}
    </>
  );
}

/* ─── MOBILE ROW ─────────────────────────────────────────────────────── */
function MobileRow({ item, index, tab, onTap }) {
  const [pressed, setPressed] = useState(false);
  const isContact   = tab === "Contact";
  const hasAction   = isContact ? !!item.url : !!item.photo;

  return (
    <div
      onClick={hasAction ? onTap : undefined}
      onTouchStart={() => hasAction && setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 0",
        borderBottom: "0.5px solid rgba(0,0,0,0.07)",
        cursor: hasAction ? "pointer" : "default",
        opacity: pressed ? 0.45 : 1,
        transition: "opacity 0.12s",
        animation: `fadeRow 0.28s ease both`,
        animationDelay: `${index * 32}ms`,
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 400, color: "#111", letterSpacing: "-0.015em", display: "block" }}>
          {isContact ? item.label : item.name}
        </span>
        {isContact && (
          <span style={{ fontSize: 12.5, color: "#c0c0c0", fontWeight: 300, display: "block", marginTop: 2, letterSpacing: "-0.005em" }}>
            {item.name}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginLeft: 16 }}>
        {item.year && (
          <span style={{ fontSize: 12.5, color: "#d0d0d0", fontVariantNumeric: "tabular-nums", fontWeight: 300 }}>
            {item.year}
          </span>
        )}
        {hasAction && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.25 }}>
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );
}
