import React, { useEffect, useRef, useState } from "react";
import useToast from "../hooks/useToast";

const InputField = ({
  prompt,
  setPrompt,
  bottomDivHeight,
  setBottomDivHeight,
  isTransitioning,
  setInput,
  isTypingEffectEnabled,
  setLoading,
}) => {
  const bottomDivRef = useRef(null);
  const timeoutRef = useRef(null);
  const typingIndexRef = useRef(0);
  const modelResponseRef = useRef("");
  const [isResizing, setisResizing] = useState();
  const [showToastMessage, ToastComponent] = useToast();

  const handleResizeBottom = (e) => {
    e.preventDefault();

    const totalHeight = window.innerHeight;
    const startY = e.clientY;
    const startHeight = bottomDivRef.current.offsetHeight;

    document.body.style.cursor = "ns-resize";

    const onMouseMove = (e) => {
      setisResizing(true);
      const newHeight = startHeight + (startY - e.clientY);
      const percentage = (newHeight / totalHeight) * 100;

      if (percentage >= 0 && percentage <= 100) {
        setBottomDivHeight(percentage);
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

  const handleResizeBottomTouch = (e) => {
    e.preventDefault();

    const totalHeight = window.innerHeight;
    const startY = e.touches[0].clientY;
    const startHeight = bottomDivRef.current.offsetHeight;

    document.body.style.cursor = "ns-resize";

    const onTouchMove = (e) => {
      setisResizing(true);
      const newHeight = startHeight + (startY - e.touches[0].clientY);
      const percentage = (newHeight / totalHeight) * 100;

      if (percentage >= 0 && percentage <= 100) {
        setBottomDivHeight(percentage);
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

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      setPrompt("");
      e.preventDefault();
      if (prompt.trim() === "") return;

      setLoading(true);

      try {
        // const response = await fetch("http://localhost:5000/chat",
        const response = await fetch("https://mark-hub-api.vercel.app/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt }),
        });

        if (response.status === 503) {
          showToastMessage(`${response.status} 🫠`, "error");
          return;
        }

        const data = await response.json();
        if (data.response) {
          let modelResponse = data.response;

          modelResponse = modelResponse.replace(
            /\/\[([\s\S]*?)\/\]/g,
            (match, content) => {
              const processedContent = content.replace(/\//g, "\\");
              const trimmedContent = processedContent
                .split("\n")
                .map((line) => line.trim())
                .join("\n");
              return `\\[\n${trimmedContent}\n\\]`;
            }
          );

          modelResponse = modelResponse.replace(
            /\/\(([\s\S]*?)\/\)/g,
            (match, content) => {
              const processedContent = content.replace(/\//g, "\\");
              return `\\(${processedContent}\\)`;
            }
          );

          modelResponseRef.current = modelResponse;
          console.log(modelResponse);

          if (isTypingEffectEnabled) {
            const typeWriter = (text, index = 0) => {
              if (index < text.length) {
                setInput((prev) => prev + text.charAt(index));
                typingIndexRef.current = index + 1;
                timeoutRef.current = setTimeout(
                  () => typeWriter(text, index + 1),
                  8
                );
              }
            };

            setInput("");
            typeWriter(modelResponse);
          } else {
            setInput(modelResponse);
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        showToastMessage(
          "Error sending message: " + error.message + " 🫠",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isTypingEffectEnabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        const remainingText = modelResponseRef.current.slice(
          typingIndexRef.current
        );
        setInput((prev) => prev + remainingText);
      }
      typingIndexRef.current = 0;
      modelResponseRef.current = "";
    }
  }, [isTypingEffectEnabled, setInput]);

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
          placeholder="Type your prompt here and press Ctrl + Enter to send"
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
          id="resize-handle-bottom"
          onMouseDown={handleResizeBottom}
          onTouchStart={(e) => {
            handleResizeBottomTouch(e);
            setisResizing(true);
          }}
          onMouseEnter={() => {
            setisResizing(true);
          }}
          onMouseLeave={() => {
            setisResizing(false);
          }}
          onTouchEnd={() => {
            setisResizing(false);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            cursor: "ns-resize",
            backgroundColor: isResizing ? "#4D4F54" : "transparent",
            transition: "background-color 0.3s ease",
          }}
        ></div>
      </div>
      {ToastComponent}
    </div>
  );
};

export default InputField;
