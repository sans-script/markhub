import React from "react";

const InputField = ({
  prompt,
  setPrompt,
  bottomDivHeight,
  isTransitioning,
  bottomDivRef,
  handleResizeBottom,
}) => {
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      if (prompt.trim() === "") {
        return;
      }
      console.log(prompt);
      setPrompt("");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: `${bottomDivHeight}%`,
        transition: isTransitioning ? "height 0.1s ease" : "none",
      }}
    >
      <div
        ref={bottomDivRef}
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <textarea
          placeholder="Type your prompt here and press Ctrl + Enter to send..."
          value={prompt}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            outline: "none",
            border: "none",
            backgroundColor: "#1a1d23",
            color: "#D4D4D4",
            padding: "10px",
            boxSizing: "border-box",
            fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
            fontSize: "14px",
            lineHeight: "1.4",
            letterSpacing: "0.5px",
            caretColor: "#FFFFFF",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        ></textarea>

        <div
          onMouseDown={handleResizeBottom}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1.5px",
            cursor: "ns-resize",
            backgroundColor: "#2D2F34",
          }}
        ></div>
      </div>
    </div>
  );
};

export default InputField;
