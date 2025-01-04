"use client";

import { useState, useRef, useEffect } from "react";
import Menu from "./components/Menu";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import InputField from "./components/InputField";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [input, setInput] = useState("");
  const [editorWidth, setEditorWidth] = useState(50);
  const [bottomDivHeight, setBottomDivHeight] = useState(20);
  const [sidebarWidth, setSidebarWidth] = useState(3);
  const [prompt, setPrompt] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleEditor = () => {
    setIsTransitioning(true);

    setEditorWidth(100);

    if (bottomDivHeight > 20) {
      setBottomDivHeight(20);
    }
    if (editorWidth === 100) {
      setEditorWidth(50);
    }

    setTimeout(() => setIsTransitioning(false), 100);
  };

  const togglePreview = () => {
    setIsTransitioning(true);

    setEditorWidth(0);

    if (bottomDivHeight > 20) {
      setBottomDivHeight(20);
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
      setBottomDivHeight(20);
    }

    setTimeout(() => setIsTransitioning(false), 100);
  };

  const toggleSidebar = () => {
    setIsTransitioning(true);
    setSidebarWidth(3);
    if (sidebarWidth === 3) {
      setSidebarWidth(20);
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
        toggleSidebar={toggleSidebar}
        saveAsMarkdown={saveAsMarkdown}
        openMarkdownFile={openMarkdownFile}
      />

      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sidebar */}
        <Sidebar
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
          isTransitioning={isTransitioning}
        />

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Monaco Editor Box */}
            <Editor
              input={input}
              setInput={setInput}
              bottomDivHeight={bottomDivHeight}
              editorWidth={editorWidth}
              isTransitioning={isTransitioning}
              setEditorWidth={setEditorWidth}
              sidebarWidth={sidebarWidth}
            />

            {/* Preview Container */}
            <Preview
              input={input}
              editorWidth={editorWidth}
              bottomDivHeight={bottomDivHeight}
              isTransitioning={isTransitioning}
            />
          </div>

          {/* Input Field */}
          <InputField
            prompt={prompt}
            setPrompt={setPrompt}
            bottomDivHeight={bottomDivHeight}
            setBottomDivHeight={setBottomDivHeight}
            isTransitioning={isTransitioning}
          />
        </div>
      </div>
    </div>
  );
}
