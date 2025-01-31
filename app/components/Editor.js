import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const Editor = ({
  input,
  setInput,
  bottomDivHeight,
  editorWidth,
  setEditorWidth,
  isTransitioning,
  sidebarWidth,
  scrollPos,
  setScrollPos,
  editorScrollPos,
}) => {
  const editorDivRef = useRef(null);
  const editorRef = useRef(null);
  const [isResizing, setisResizing] = useState();

  const handleResizeSide = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = editorDivRef.current.offsetWidth;
    const sidebarWidthPx = (sidebarWidth / 100) * window.innerWidth;

    document.body.style.cursor = "ew-resize";

    const onMouseMove = (e) => {
      setisResizing(true);
      const newWidth = startWidth + (e.clientX - startX);

      const percentage =
        (newWidth / (window.innerWidth - sidebarWidthPx)) * 100;

      if (percentage >= 0 && percentage <= 90) {
        setEditorWidth(percentage);
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

  const handleResizeSideTouch = (e) => {
    e.preventDefault();

    const startX = e.touches[0].clientX;
    const startWidth = editorDivRef.current.offsetWidth;
    const sidebarWidthPx = (sidebarWidth / 100) * window.innerWidth;

    document.body.style.cursor = "ew-resize";

    const onTouchMove = (e) => {
      const newWidth = startWidth + (e.touches[0].clientX - startX);
      const percentage =
        (newWidth / (window.innerWidth - sidebarWidthPx)) * 100;

      if (percentage >= 0 && percentage <= 90) {
        setEditorWidth(percentage);
      }
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.body.style.cursor = "default";
      updateHandleColor();
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

  useEffect(() => {
    const updateScroll = () => {
      if (editorRef.current) {
        const currentScrollPos = editorRef.current.getScrollTop();
        if (Math.abs(currentScrollPos - scrollPos) > 1) {
          editorRef.current.setScrollPosition({
            scrollTop: scrollPos,
          });
        }
      }
    };

    const frameId = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(frameId);
  }, [scrollPos]);

  return (
    <div
      ref={editorDivRef}
      style={{
        width: `${editorWidth}%`,
        height: `${100 - bottomDivHeight}%`,
        border: "none",
        outline: "none",
        paddingTop: "5px",
        boxSizing: "border-box",
        resize: "none",
        overflow: "hidden",
        position: "relative",
        display: `${editorWidth < 0.5 ? "none" : "inline"}`,
        transition: isTransitioning
          ? "width 0.1s ease, height 0.1s ease"
          : "none",
      }}
    >
      <MonacoEditor
        style={{
          backgroundColor: "#1e1e1e",
        }}
        height="100%"
        language="markdown"
        value={input}
        onChange={(value) => setInput(value)}
        options={{
          theme: "github-dark",
          wordWrap: "on",
          automaticLayout: true,
          scrollbar: {
            vertical: "hidden",
          },
        }}
        onMount={(editor, monaco) => {
          monaco.editor.defineTheme("github-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [{ token: "comment", fontStyle: "italic" }],
            colors: {
              "editor.background": "#0d1117",
            },
          });
          editor.updateOptions({
            theme: "github-dark",
          });

          editor.setScrollPosition({
            scrollTop: editorScrollPos,
          });

          editor.onDidScrollChange((e) => {
            if (e.scrollTop !== scrollPos) {
              setScrollPos(e.scrollTop);
            }
          });

          editorRef.current = editor;
        }}
      />
      {/* Resize Handle */}
      <div
        id="resize-handle-editor"
        onMouseDown={handleResizeSide}
        onTouchStart={(e) => {
          handleResizeSideTouch(e);
          setisResizing(true);
        }}
        onTouchEnd={() => {
          setisResizing(false);
        }}
        onMouseEnter={() => {
          setisResizing(true);
        }}
        onMouseLeave={() => {
          setisResizing(false);
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 11,
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

export default Editor;
