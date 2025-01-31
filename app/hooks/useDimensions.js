import { useState } from 'react';

const useDimensions = () => {
  const [editorWidth, setEditorWidth] = useState(50);
  const [bottomDivHeight, setBottomDivHeight] = useState(20);
  const [sidebarWidth, setSidebarWidth] = useState(3);

  return {
    editorWidth, setEditorWidth,
    bottomDivHeight, setBottomDivHeight,
    sidebarWidth, setSidebarWidth
  };
};

export default useDimensions;