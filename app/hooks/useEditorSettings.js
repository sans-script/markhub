import { useState } from "react";

const useEditorSettings = (editorGuideContent) => {
  const [input, setInput] = useState(editorGuideContent);
  const [scrollPos, setScrollPos] = useState(0);
  const [editorScrollPos, setEditorScrollPos] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [isTypingEffectEnabled, setTypingEffectEnabled] = useState(false);

  return {
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
  };
};

export default useEditorSettings;
