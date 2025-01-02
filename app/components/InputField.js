import React, { useRef } from "react";

const InputField = ({
  prompt,
  setPrompt,
  bottomDivHeight,
  setBottomDivHeight,
  isTransitioning,
}) => {
  const bottomDivRef = useRef(null);

  const handleResizeBottom = (e) => {
    e.preventDefault();

    const totalHeight = window.innerHeight;
    const startY = e.clientY;
    const startHeight = bottomDivRef.current.offsetHeight;

    document.body.style.cursor = "ns-resize";

    const onMouseMove = (e) => {
      const newHeight = startHeight + (startY - e.clientY);
      const percentage = (newHeight / totalHeight) * 100;

      if (percentage >= 0 && percentage <= 100) {
        setBottomDivHeight(percentage);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleResizeBottomTouch = (e) => {
    e.preventDefault();

    const totalHeight = window.innerHeight;
    const startY = e.touches[0].clientY;
    const startHeight = bottomDivRef.current.offsetHeight;

    const onTouchMove = (e) => {
      const newHeight = startHeight + (startY - e.touches[0].clientY);
      const percentage = (newHeight / totalHeight) * 100;

      if (percentage >= 0 && percentage <= 100) {
        setBottomDivHeight(percentage);
      }
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.body.style.cursor = "default";
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

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
          onTouchStart={handleResizeBottomTouch}
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
