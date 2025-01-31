import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkMermaidPlugin from "remark-mermaid-plugin";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const Preview = ({
  input,
  editorWidth,
  bottomDivHeight,
  isTransitioning,
  scrollPos,
  setScrollPos,
  setEditorScrollPos,
}) => {


  function convertLatexSyntax(text) {
    text = text.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (match, p1) => {
      const trimmed = p1.trim();
      return `$$\n${trimmed}\n$$`;
    });
    text = text.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (match, p1) => {
      const trimmed = p1.trim();
      return `$${trimmed}$`;
    });

    return text;
  }

  function convertMermaidSyntax(text) {
    text = text.replace(/```mermaid(?![\s\S]*```)/g, "```text");
    text = text.replace(/```mermaid\s*```/g, "```text \n```");

    return text;
  }

  function wrapMarkdownTableInDiv(text) {
    const tableRegex = /(\|.*\|\n\|.*\|\n(\|.*\|\n)*)(\|.*\|.*\n?)/g;
    text = text.replace(tableRegex, (match) => {
      return `<div style="display:flex; justify-content:center; width: 100%;">\n\n${match}\n\n</div>`;
    });

    return text;
  }

  const processedInput = convertLatexSyntax(convertMermaidSyntax(wrapMarkdownTableInDiv(input)));

  if (typeof window === "undefined") return null;

  return (
    <div
      style={{
        width: `${100 - editorWidth}%`,
        height: `${100 - bottomDivHeight}%`,
        padding: "5px 10px",
        overflowX: "hidden",
        overflowY: "auto",
        display: `${editorWidth > 99 ? "none" : "inline"}`,
        boxSizing: "border-box",
        position: "absolute",
        right: 0,
        transition: isTransitioning
          ? "width 0.1s ease, height 0.1s ease"
          : "none",
      }}
      ref={(div) => {
        if (div) {
          div.scrollTop = scrollPos;
          setEditorScrollPos(div.scrollTop);
        }
      }}
      onScroll={(e) => {
        const newScrollPos = e.target.scrollTop;
        if (Math.abs(newScrollPos - scrollPos) > 1) {
          setScrollPos(newScrollPos);
        }
      }}
    >
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkMath, remarkGfm, remarkMermaidPlugin]}
        allowHtml={true}
        rehypePlugins={[
          rehypeKatex,
          rehypeHighlight,
          rehypeRaw,
          rehypeStringify,
        ]}
      >
        {processedInput}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;
