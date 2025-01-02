"use client";

import { useState, useRef, useEffect } from "react";
import Menu from "./components/Menu";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import InputField from "./components/InputField";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css";

export default function Home() {
  const [input, setInput] = useState("");
  const [editorWidth, setEditorWidth] = useState(50);
  const [bottomDivHeight, setBottomDivHeight] = useState(10);
  const [prompt, setPrompt] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const editorRef = useRef(null);
  const bottomDivRef = useRef(null);

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

      // Restaurar o cursor para o padrão
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const toggleEditor = () => {
    setIsTransitioning(true);

    setEditorWidth(100);

    if (bottomDivHeight > 10) {
      setBottomDivHeight(10);
    }
    if (editorWidth === 100) {
      setEditorWidth(50);
    }

    setTimeout(() => setIsTransitioning(false), 100);
  };

  const togglePreview = () => {
    setIsTransitioning(true);

    setEditorWidth(0);

    if (bottomDivHeight > 10) {
      setBottomDivHeight(10);
    }

    if (editorWidth === 0) {
      setEditorWidth(50);
    }

    setTimeout(() => setIsTransitioning(false), 100);
  };

  const toggleInput = () => {
    setIsTransitioning(true);

    setBottomDivHeight(100);
    if (bottomDivHeight === 100) {
      setBottomDivHeight(10);
    }

    setTimeout(() => setIsTransitioning(false), 100);
  };

  const saveAsMarkdown = async () => {
    try {
      if (!input || input.trim() === "") {
        alert("Cannot save an empty file. Please add content before saving.");
        return;
      }

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "file.md",
        types: [
          {
            description: "Markdown Files",
            accept: { "text/markdown": [".md"] },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(input);
      await writable.close();

      alert("File saved successfully!");
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error saving the file:", error);
        alert("An error occurred while saving the file.");
      }
    }
  };

  const openMarkdownFile = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Markdown Files",
            accept: { "text/markdown": [".md"] },
          },
        ],
        multiple: false,
      });

      const file = await fileHandle.getFile();
      const content = await file.text();

      if (content.trim() === "") {
        alert("The file is empty.");
        return;
      }

      setInput(content);
      // alert(`File "${file.name}" loaded successfully!`);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("File selection was canceled.");
      } else {
        console.error("Error opening the file:", error);
        alert("An error occurred while opening the file.");
      }
    }
  };


  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll("pre").forEach((element) => {
        if (element.querySelector("code.language-mermaid")) {
          element.style.backgroundColor = "white";
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="markdown-body"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Menu */}
      <Menu
        toggleEditor={toggleEditor}
        togglePreview={togglePreview}
        toggleInput={toggleInput}
        saveAsMarkdown={saveAsMarkdown}
        openMarkdownFile={openMarkdownFile}
      />

      {/* Editor e Preview Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Monaco Editor Box */}
        <Editor
          input={input}
          setInput={setInput}
          handleResizeSide={handleResizeSide}
          bottomDivHeight={bottomDivHeight}
          editorWidth={editorWidth}
          isTransitioning={isTransitioning}
          setEditorWidth={setEditorWidth}
        />

        {/* Preview Container*/}
        <Preview
          input={input}
          editorWidth={editorWidth}
          bottomDivHeight={bottomDivHeight}
          isTransitioning={isTransitioning}
        />

        {/* Input Field */}
        <InputField
          prompt={prompt}
          setPrompt={setPrompt}
          bottomDivHeight={bottomDivHeight}
          isTransitioning={isTransitioning}
          bottomDivRef={bottomDivRef}
          handleResizeBottom={handleResizeBottom}
        />
      </div>
    </div>
  );
}
