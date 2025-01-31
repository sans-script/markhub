import React from "react";

const Menu = ({
  toggleEditor,
  togglePreview,
  toggleInput,
  toggleSidebar,
  saveAsMarkdown,
  openMarkdownFile,
  isTypingEffectEnabled,
  toggleTypingEffect,
}) => {
  return (
    <div
      style={{
        height: "16px",
        width: "100%",
        borderBottom: "1px solid #2D2F34",
        padding: "5px 5px 5px 10px",
        display: "flex",
        gap: "20px",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.5s",
        }}
        onClick={openMarkdownFile}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        Open
      </p>
      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.5s",
        }}
        onClick={saveAsMarkdown}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        Save
      </p>
      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={toggleEditor}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        Editor
      </p>

      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={togglePreview}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        Preview
      </p>

      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.5s",
        }}
        onClick={toggleInput}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        Input
      </p>
      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={toggleSidebar}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        Sidebar
      </p>
      <p
        style={{
          fontSize: "12px",
          cursor: "pointer",
          transition: "color 0.3s",
        }}
        onClick={toggleTypingEffect}
        onMouseEnter={(e) => (e.target.style.color = "#007bff")}
        onMouseLeave={(e) => (e.target.style.color = "inherit")}
      >
        {isTypingEffectEnabled ? "Disable" : "Enable"} Typing Effect
      </p>
    </div>
  );
};

export default Menu;
