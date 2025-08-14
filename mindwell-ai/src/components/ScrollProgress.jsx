import React, { useState, useEffect } from "react";

const ScrollProgress = ({ color = "#7a6c57", height = "4px" }) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || 0;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScroll(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calc
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        style={{
          width: `${scroll}%`,
          height,
          backgroundColor: color,
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
