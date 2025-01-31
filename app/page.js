"use client";

import { useEffect } from "react";
import Menu from "./components/Menu";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import InputField from "./components/InputField";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./utils/ErrorBoundary";
import useDimensions from "./hooks/useDimensions";
import useEditorSettings from "./hooks/useEditorSettings";
import useStatus from "./hooks/useStatus";
import editorGuideContent from "./examples/editorGuideContent";
import useToast from "./hooks/useToast";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css";

export default function Home() {
  const editorContent = editorGuideContent;

  const {
    editorWidth,
    setEditorWidth,
    bottomDivHeight,
    setBottomDivHeight,
    sidebarWidth,
    setSidebarWidth,
  } = useDimensions();

  const {
    input,
    setInput,
    prompt,
    setPrompt,
    isTypingEffectEnabled,
    setTypingEffectEnabled,
    scrollPos,
    setScrollPos,
    editorScrollPos,
    setEditorScrollPos,
  } = useEditorSettings(editorContent);

  const {
    isTransitioning,
    setIsTransitioning,
    errorKey,
    setErrorKey,
    loading,
    setLoading,
  } = useStatus();

  const [showToastMessage, ToastComponent] = useToast();

  const toggleTypingEffect = () => {
    setTypingEffectEnabled((prev) => !prev);
  };

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
        showToastMessage(
          "Why should I save an empty file??? 🤨 \n Please add content before saving!",
          "error"
        );

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

      showToastMessage("File saved successfully!", "success");
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error saving the file:", error);
        showToastMessage("An error occurred while saving the file.", "error");
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
        showToastMessage("The file is empty 😐\n", "error");
        return;
      }
      if (content == input) {
        showToastMessage("The file is already open 😐\n", "info");
      } else {
        setInput(content);
        showToastMessage(
          `File "${file.name}" loaded successfully! 😀`,
          "success"
        );
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("File selection was canceled.");
      } else {
        console.error("Error opening the file:", error);
        showToastMessage(
          "An error occurred while opening the file 😭\n",
          "error"
        );
      }
    }
  };

  const handleInputChange = (newInput) => {
    setInput(newInput);
    setErrorKey((prevKey) => prevKey + 1);
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
      {/* Overlay de Fallback */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              background:
                "linear-gradient(90deg, transparent, white, transparent)",
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              animation: "spotlight 3s linear infinite",
            }}
          >
            Mr. Magic is doing Magic ✨
          </div>
        </div>
      )}

      {/* Menu */}
      <Menu
        toggleEditor={toggleEditor}
        togglePreview={togglePreview}
        toggleInput={toggleInput}
        toggleSidebar={toggleSidebar}
        saveAsMarkdown={saveAsMarkdown}
        openMarkdownFile={openMarkdownFile}
        isTypingEffectEnabled={isTypingEffectEnabled}
        toggleTypingEffect={toggleTypingEffect}
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
              scrollPos={scrollPos}
              setScrollPos={setScrollPos}
              editorScrollPos={editorScrollPos}
              setEditorScrollPos={setEditorScrollPos}
            />

            {/* Preview Container */}
            <ErrorBoundary key={errorKey}>
              <Preview
                input={input}
                editorWidth={editorWidth}
                bottomDivHeight={bottomDivHeight}
                isTransitioning={isTransitioning}
                scrollPos={scrollPos}
                setScrollPos={setScrollPos}
                editorScrollPos={editorScrollPos}
                setEditorScrollPos={setEditorScrollPos}
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
            setInput={setInput}
            setTypingEffectEnabled={setTypingEffectEnabled}
            isTypingEffectEnabled={isTypingEffectEnabled}
            input={input}
            setLoading={setLoading}
          />
        </div>
      </div>
      {ToastComponent}
    </div>
  );
}
