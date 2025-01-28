"use client";

import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import InputField from "./components/InputField";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import ErrorBoundary from "./utils/ErrorBoundary";
import editorGuideContent from "./examples/editorGuideContent";

export default function Home() {
  const [input, setInput] = useState(editorGuideContent);
  const [editorWidth, setEditorWidth] = useState(50);
  const [bottomDivHeight, setBottomDivHeight] = useState(20);
  const [sidebarWidth, setSidebarWidth] = useState(3);
  const [prompt, setPrompt] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [errorKey, setErrorKey] = useState(0);

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
        setToastMessage(
          "Cannot save an empty file. Please add content before saving."
        );
        setToastType("error");
        return;
      }

      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "README.md",
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

      setToastMessage("File saved successfully!");
      setToastType("success");
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error saving the file:", error);
        setToastMessage("An error occurred while saving the file.");
        setToastType("error");
      }
    }
  };

  const handleCloseToast = () => {
    setToastMessage("");
    setToastType("");
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
        setToastMessage("The file is empty.");
        setToastType("error");
        return;
      }

      setInput(content);
      setToastMessage(`File "${file.name}" loaded successfully!`);
      setToastType("success");
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("File selection was canceled.");
      } else {
        console.error("Error opening the file:", error);
        setToastMessage("An error occurred while opening the file.");
        setToastType("error");
      }
    }
  };

  const handleInputChange = (newInput) => {
    setInput(newInput);
    setErrorKey((prevKey) => prevKey + 1); // Atualiza o erroKey para forçar re-renderização
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll("pre").forEach((element) => {
        const codeElement = element.querySelector("code");
        if (codeElement) {
          if (codeElement.classList.contains("language-mermaid")) {
            element.style.backgroundColor = "white";
          } else {
            element.style.backgroundColor = "";
          }
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
              setInput={handleInputChange}
              bottomDivHeight={bottomDivHeight}
              editorWidth={editorWidth}
              isTransitioning={isTransitioning}
              setEditorWidth={setEditorWidth}
              sidebarWidth={sidebarWidth}
            />

            {/* Preview Container */}
            <ErrorBoundary key={errorKey}>
              <Preview
                input={input}
                editorWidth={editorWidth}
                bottomDivHeight={bottomDivHeight}
                isTransitioning={isTransitioning}
              />
            </ErrorBoundary>
          </div>

          {/* Input Field */}
          <InputField
            prompt={prompt}
            setPrompt={setPrompt}
            bottomDivHeight={bottomDivHeight}
            setBottomDivHeight={setBottomDivHeight}
            isTransitioning={isTransitioning}
          />

          {toastMessage && (
            <Toast
              message={toastMessage}
              onClose={handleCloseToast}
              type={toastType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
