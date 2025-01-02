import React, { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

const Editor = ({
  input,
  setInput,
  bottomDivHeight,
  editorWidth,
  setEditorWidth,
  isTransitioning,
}) => {
  const editorRef = useRef(null);
  const handleResizeSide = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = editorRef.current.offsetWidth;

    document.body.style.cursor = "ew-resize";

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const percentage = (newWidth / window.innerWidth) * 100;

      setEditorWidth(percentage);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  return (
    <div
      ref={editorRef}
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
          editor.layout();
        }}
      />
      {/* Resize Handle */}
      <div
        onMouseDown={handleResizeSide}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "1.5px",
          cursor: "ew-resize",
          backgroundColor: "#2D2F34",
        }}
      ></div>
    </div>
  );
};

export default Editor;
