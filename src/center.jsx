import React, { useState } from "react";

const items = [
  "Interaction",
  "@Everyone",
  "/Gif",
  "/Silent",
  "Gyro Pride Theme",
  "Word Effects",
  "Reactions",
    "Interaction",
  "@Everyone",
  "/Gif",
  "/Silent",
  "Gyro Pride Theme",
  "Word Effects",
  "Reactions",
];

// Photo array - add your photos here. If fewer photos than items, they will repeat
const photos = [
  "https://plus.unsplash.com/premium_photo-1675448891119-bda089d46450?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZSUyMHBob25lJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwcGhvbmUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",  
  "https://images.unsplash.com/photo-1624280664758-4350adc906c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlJTIwcGhvbmUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1614978474506-42d30acd205d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZSUyMHBob25lJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1664117436431-aaa0d75814fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZSUyMHBob25lJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww"
];

// Function to get photo based on item index
const getPhotoUrl = (itemIndex) => {
  return photos[itemIndex % photos.length];
};

export default function App() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const targetPos = React.useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  };

  React.useEffect(() => {
    let animationId;
    const smoothFollow = () => {
      setSmoothPos(prev => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.15,
        y: prev.y + (targetPos.current.y - prev.y) * 0.15,
      }));
      animationId = requestAnimationFrame(smoothFollow);
    };
    animationId = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-screen w-full flex relative" onMouseMove={handleMouseMove} style={{ overflow: 'hidden' }}>

      {/* LEFT SIDE (SCROLLABLE) */}
    <div className="
      w-[90vh]
      h-full            
      overflow-y-auto
      scrollbar-hide
      flex
      items-start
      justify-center
      pt-20
      text-[1.25rem]
    ">
      <div className="
        w-89
        flex flex-col
        gap-6
      ">
        <div className="h-42" />
        {items.map((item, i) => (
          <div 
            key={i} 
            className="flex justify-between items-center text-gray-800 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 w-full" 
            style={{ padding: "0.75rem 3rem" }}
            onMouseEnter={() => setHoveredItem(i)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className="font-semibold text-lg">{item}</span>
            <span className="text-black ml-8 text-lg">2022</span>
          </div>
        ))}
        <div className="h-20" />
      </div>
    </div>

      {/* RIGHT SIDE (FIXED CENTER) */}
      <div className="
        w-1/2
        h-full
        flex
        flex-col
        items-center
        justify-center
      ">
        <div className="flex flex-col gap-3">

          {/* IMAGE */}
          <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6">
            <img
              src="https://thumbs.dreamstime.com/b/square-frame-beautiful-nature-scenery-close-up-dandelion-against-cloudy-blue-sky-white-flower-blooms-amid-green-154769697.jpg"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <h1 className="text-2xl font-bold text-black leading-tight mb-6">
            Aniket Patel,<br />
            Code to understand how{" "}
            <span className="bg-linear-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              things
            </span>{" "}
            work
          </h1>

          {/* LINKS */}
          <div className="flex gap-6 text-black opacity-70 text-lg">
            <a href="#" className="hover:opacity-100 transition-opacity">Projects</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Experience</a>
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </div>

      {/* PHOTO POPUP MODAL */}
      {hoveredItem !== null && (
        <div 
          className="pointer-events-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn" 
          style={{ 
            width: "350px", 
            height: "500px",
            position: 'fixed',
            left: `calc(${smoothPos.x}px + 175px)`,
            top: `calc(${smoothPos.y}px - 290px)`,
            zIndex: 50,
            willChange: 'left, top',
            pointerEvents: 'none',
            margin: 0,
            padding: 0
          }}
        >
          <img 
            src={getPhotoUrl(hoveredItem)} 
            alt="Preview" 
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/350x500?text=Photo";
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

    </div>
  );
}