import { useState, useRef, useEffect } from "react";

const photos = [
  "https://plus.unsplash.com/premium_photo-1675448891119-bda089d46450?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1624280664758-4350adc906c1?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1614978474506-42d30acd205d?w=600&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1664117436431-aaa0d75814fe?w=600&auto=format&fit=crop&q=60",
];

const DATA = {
  Projects: [
    { name: "Interaction Design",   year: "2024", photo: photos[0] },
    { name: "@Everyone Broadcast",  year: "2023", photo: photos[1] },
    { name: "/Gif Engine",          year: "2023", photo: photos[2] },
    { name: "/Silent Mode",         year: "2022", photo: photos[3] },
    { name: "Gyro Pride Theme",     year: "2022", photo: photos[4] },
    { name: "Word Effects",         year: "2022", photo: photos[5] },
    { name: "Reactions 2.0",        year: "2021", photo: photos[6] },
    { name: "Tweets in Thread",     year: "2021", photo: photos[0] },
    { name: "Super React",          year: "2021", photo: photos[1] },
    { name: "Shops Products",       year: "2020", photo: photos[2] },
  ],
  Experience: [
    { name: "Frontend Engineer — Acme Corp", year: "2024", photo: null },
    { name: "UI Dev — Startup X",            year: "2022", photo: null },
    { name: "Freelance Developer",           year: "2020", photo: null },
    { name: "Intern — Tech Co",              year: "2019", photo: null },
  ],
  About: [
    { name: "Based in Surat, India",  year: "", photo: null },
    { name: "Open to opportunities",  year: "", photo: null },
    { name: "React & TypeScript",     year: "", photo: null },
    { name: "5 years experience",     year: "", photo: null },
  ],
  Contact: [
    { name: "aniket@email.com", year: "", photo: null },
    { name: "Twitter / X",      year: "", photo: null },
    { name: "GitHub",           year: "", photo: null },
    { name: "LinkedIn",         year: "", photo: null },
  ],
};

const NAV_TABS = ["Projects", "Experience", "About", "Contact"];

function PhotoModal({ item, onClose }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "bgin .2s ease both",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: -48, right: 0,
            width: 40, height: 40, borderRadius: "50%",
            background: "#000", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Card */}
        <div
          style={{
            width: "min(320px, 86vw)",
            background: "#fff",
            borderRadius: 24,
            overflow: "hidden",
            animation: "popUp .26s cubic-bezier(.32,.72,0,1) both",
          }}
        >
          <img
            src={item.photo}
            alt={item.name}
            style={{
              width: "100%",
              aspectRatio: "9/16",
              maxHeight: "65vh",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div style={{ padding: "16px 20px 18px" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111", letterSpacing: "-0.01em" }}>
              {item.name}
            </p>
            {item.year && (
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#aaa", fontWeight: 400 }}>
                {item.year}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Left() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [openItem, setOpenItem]   = useState(null);
  const listRef                   = useRef(null);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { height: 100%; }
        body { height: 100%; -webkit-font-smoothing: antialiased; }
        #root { height: 100%; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeRow {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgin  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popUp {
          from { opacity: 0; transform: scale(.94); }
          to   { opacity: 1; transform: scale(1);   }
        }
      `}</style>

      <div
        style={{
          width: "100vw",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ flexShrink: 0, padding: "52px 32px 28px" }}>

          {/* Avatar */}
          <div
            style={{
              width: 64, height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 20,
              boxShadow: "0 0 0 1.5px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src="https://thumbs.dreamstime.com/b/square-frame-beautiful-nature-scenery-close-up-dandelion-against-cloudy-blue-sky-white-flower-blooms-amid-green-154769697.jpg"
              alt="Aniket Patel"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <h1
            style={{
              fontSize: 28, fontWeight: 600, color: "#111",
              letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 6,
            }}
          >
            Aniket Patel,
          </h1>

          <p
            style={{
              fontSize: 17, fontWeight: 400, color: "#111",
              letterSpacing: "-0.01em", lineHeight: 1.4, marginBottom: 24,
            }}
          >
            code to understand how things{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#ec4899,#8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              work
            </span>
          </p>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "#111" : "#aaa",
                    background: "none", border: "none",
                    borderBottom: isActive ? "1.5px solid #111" : "1.5px solid transparent",
                    paddingBottom: 2,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "color .15s",
                    userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ flexShrink: 0, height: "0.5px", background: "rgba(0,0,0,0.08)", margin: "0 32px" }} />

        {/* ── LIST ── */}
        <div
          key={activeTab}
          ref={listRef}
          style={{
            flex: 1, minHeight: 0,
            overflowY: "auto", overflowX: "hidden",
            padding: "0 32px 48px",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          {DATA[activeTab].map((item, i) => (
            <div
              key={i}
              onClick={() => item.photo && setOpenItem(item)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 0",
                borderBottom: "0.5px solid rgba(0,0,0,0.06)",
                cursor: item.photo ? "pointer" : "default",
                transition: "opacity .15s",
                animation: "fadeRow .28s ease both",
                animationDelay: `${i * 36}ms`,
              }}
              onMouseEnter={(e) => item.photo && (e.currentTarget.style.opacity = ".4")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontSize: 16, fontWeight: 400, color: "#1a1a1a", letterSpacing: "-0.01em" }}>
                {item.name}
              </span>
              {item.year && (
                <span style={{ fontSize: 13, color: "#ccc", fontWeight: 400, flexShrink: 0, marginLeft: 24, fontVariantNumeric: "tabular-nums" }}>
                  {item.year}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {openItem && <PhotoModal item={openItem} onClose={() => setOpenItem(null)} />}
    </>
  );
}