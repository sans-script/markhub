import React, { useRef, useState } from "react";

const Sidebar = ({ sidebarWidth, setSidebarWidth, isTransitioning }) => {
  const sidebarDivRef = useRef(null);
  const [isResizing, setisResizing] = useState();

  const handleResize = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = sidebarDivRef.current.offsetWidth;

    document.body.style.cursor = "ew-resize";

    const onMouseMove = (e) => {
      setisResizing(true);
      const newWidth = startWidth + (e.clientX - startX);
      const percentage = (newWidth / window.innerWidth) * 100;

      if (percentage >= 3 && percentage <= 20) {
        setSidebarWidth(percentage);
      }
    };

    const onMouseUp = () => {
      setisResizing(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleResizeTouch = (e) => {
    e.preventDefault();

    const startX = e.touches[0].clientX;
    const startWidth = sidebarDivRef.current.offsetWidth;

    document.body.style.cursor = "ew-resize";

    const onTouchMove = (e) => {
      setisResizing(true);
      const newWidth = startWidth + (e.touches[0].clientX - startX);
      const percentage = (newWidth / window.innerWidth) * 100;

      if (percentage >= 3 && percentage <= 20) {
        setSidebarWidth(percentage);
      }
    };

    const onTouchEnd = () => {
      setisResizing(false);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.body.style.cursor = "default";
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

  return (
    <div
      ref={sidebarDivRef}
      style={{
        width: `${sidebarWidth}%`,
        transition: isTransitioning
          ? "width 0.1s ease, height 0.1s ease"
          : "none",
        height: "100%",
        backgroundColor: "#0d1117",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Conteúdo da Sidebar */}
      <div style={{ padding: "10px", color: "#ECEFF4" }}>
        <h3>Sidebar</h3>
        <p>Isso vai ser a minha Sidebar :D</p>
      </div>

      {/* Resize Handle */}
      <div
        id="resize-handle-sidebar"
        onMouseDown={handleResize}
        onTouchStart={handleResizeTouch}
        onMouseEnter={() => {
          setisResizing(true);
        }}
        onMouseLeave={() => {
          setisResizing(false);
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "4px",
          cursor: "ew-resize",
          backgroundColor: isResizing ? "#4D4F54" : "transparent",
          transition: "background-color 0.3s ease",
        }}
      ></div>
    </div>
  );
};

export default Sidebar;
