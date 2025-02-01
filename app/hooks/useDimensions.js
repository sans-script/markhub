import { useState, useEffect } from "react";

const useDimensions = () => {
  const getStoredValue = (key, defaultValue) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  };

  const [editorWidth, setEditorWidth] = useState(() =>
    getStoredValue("editorWidth", 50)
  );
  const [bottomDivHeight, setBottomDivHeight] = useState(() =>
    getStoredValue("bottomDivHeight", 20)
  );
  const [sidebarWidth, setSidebarWidth] = useState(() =>
    getStoredValue("sidebarWidth", 10)
  );

  useEffect(() => {
    localStorage.setItem("editorWidth", JSON.stringify(editorWidth));
  }, [editorWidth]);

  useEffect(() => {
    localStorage.setItem("bottomDivHeight", JSON.stringify(bottomDivHeight));
  }, [bottomDivHeight]);

  useEffect(() => {
    localStorage.setItem("sidebarWidth", JSON.stringify(sidebarWidth));
  }, [sidebarWidth]);

  return {
    editorWidth,
    setEditorWidth,
    bottomDivHeight,
    setBottomDivHeight,
    sidebarWidth,
    setSidebarWidth,
  };
};

export default useDimensions;
