"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import "github-markdown-css";

export default function Home({ fileId }) {
  const router = useRouter();
  const [initialContent, setInitialContent] = useState(editorGuideContent);
  const [showMidOverlay, setShowMidOverlay] = useState(true);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [showToastMessage, ToastComponent] = useToast();
  const [currentFileId, setCurrentFileId] = useState(fileId || null);

  const messages = [
    "Preparing the magic... 🪄✨",
    "Loading your content... ⏳",
    "Almost there... 🚀",
    "Just a moment... ⌛",
    "Hang tight... 🧘‍♂️",
    "Loading the editor... 📝",
    "I'm not gay... 🤨",
    "WAIT! I'm not ready yet... 😅",
    "I'm not a robot... 🤖",
    "Wait a minute... WHO R U? 🤨",
    "You can resize the sidebar by dragging its edge 🤯",
    "You can resize the editor by dragging its edge 🤯",
    "You can resize the bottom panel by dragging its top edge 🤯",
    "You can toggle the editor by pressing Ctrl + E 🤯",
    "Just kidding, you can't toggle the editor by pressing Ctrl + E 😂",
  ];

  useEffect(() => {
    setTimeout(() => {
      setShowMidOverlay(false);
    }, 2000);

    if (showMidOverlay) {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setOverlayMessage(randomMessage);
    }

    if (fileId) {
      const storedFiles = JSON.parse(localStorage.getItem("files")) || [];
      const file = storedFiles.find((file) => file.id === fileId);
      if (file) {
        setInput(file.content);
      }
    }
  }, [fileId]);

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
  } = useEditorSettings(initialContent);

  const {
    isTransitioning,
    setIsTransitioning,
    errorKey,
    setErrorKey,
    loading,
    setLoading,
  } = useStatus();

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

      setLoading(true);

      let fileName = "Untitled"; // Nome padrão caso a IA falhe

      try {
        // Pedindo à IA um nome baseado no conteúdo do editor
        const response = await fetch("https://mark-hub-api.vercel.app/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Suggest a file name for saving this content. The name should be brief (max 5 words) and in the same language as the content:\n\n${input}`,
          }),
        });

        const data = await response.json();
        if (data.response) {
          fileName = data.response.trim();
        }
      } catch (error) {
        console.error("Error getting file name from AI:", error);
      }

      let storedFiles = JSON.parse(localStorage.getItem("files")) || [];
      let file;

      if (currentFileId) {
        // Atualiza o arquivo existente
        storedFiles = storedFiles.map((f) =>
          f.id === currentFileId ? { ...f, content: input } : f
        );
        file = storedFiles.find((f) => f.id === currentFileId);
      } else {
        // Criar um novo arquivo
        const id = crypto.randomUUID();
        file = {
          id,
          name: fileName,
          createdAt: new Date().toISOString(),
          content: input,
        };
        storedFiles.push(file);
        setCurrentFileId(id); // Atualiza o ID do arquivo atual
      }

      localStorage.setItem("files", JSON.stringify(storedFiles));
      showToastMessage("File saved successfully in localStorage!", "success");

      // Perguntar se quer salvar no disco
      const saveToDisk = confirm(
        "Do you also want to save this file to your computer?"
      );
      if (saveToDisk) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `${file.name}.md`,
          types: [
            {
              description: "Markdown Files",
              accept: { "text/markdown": [".md"] },
            },
          ],
        });

        const writable = await fileHandle.createWritable();
        await writable.write(file.content);
        await writable.close();

        showToastMessage("File saved successfully to disk!", "success");
      }
    } catch (error) {
      console.error("Error saving the file:", error);
      showToastMessage("An error occurred while saving the file.", "error");
    } finally {
      setLoading(false);
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
  const handleNewFile = () => {
    setInput("");
    router.push("/");
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
          handleNewFile={handleNewFile}
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
            {/* Mid Overlay */}
            {showMidOverlay && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${100 - bottomDivHeight}%`,
                  backgroundColor: "#0d1117",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  zIndex: 9999,
                }}
              >
                {overlayMessage}
              </div>
            )}
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
