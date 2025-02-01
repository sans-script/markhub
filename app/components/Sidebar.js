import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = ({
  sidebarWidth,
  setSidebarWidth,
  isTransitioning,
  handleNewFile,
}) => {
  const sidebarDivRef = useRef(null);
  const [isResizing, setisResizing] = useState(false);
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const loadFiles = () => {
    const storedFiles = JSON.parse(localStorage.getItem("files")) || [];
    setFiles(storedFiles);
  };

  useEffect(() => {
    loadFiles();
    const interval = setInterval(() => {
      loadFiles();
    }, 2000);
    const handleStorageChange = (event) => {
      if (event.key === "files") {
        loadFiles();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleFileClick = (id) => {
    router.push(`/c/${id}`);
  };

  const handleResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarDivRef.current.offsetWidth;
    document.body.style.cursor = "ew-resize";

    const onMouseMove = (e) => {
      setisResizing(true);
      const newWidth = startWidth + (e.clientX - startX);
      const percentage = (newWidth / window.innerWidth) * 100;
      if (percentage >= 10 && percentage <= 20) {
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
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "10px", textAlign: "center" }}>
        <button
          onClick={handleNewFile}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#2d77ff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1c5ed6")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2d77ff")}
        >
          + New File
        </button>
      </div>

      {/* Lista de arquivos */}
      <div style={{ padding: "0px 10px", color: "#ECEFF4", flex: 1 }}>
        <h3>Files</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {files.map((file) => (
            <li
              key={file.id}
              onClick={() => handleFileClick(file.id)}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "#1a1d23",
                transition: "background-color 0.3s, transform 0.2s",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2e3440";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#1a1d23";
                e.target.style.transform = "scale(1)";
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "calc(100% - 20px)",
                  display: "inline-block",
                }}
              >
                {file.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resize Handle */}
      <div
        id="resize-handle-sidebar"
        onMouseDown={handleResize}
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
