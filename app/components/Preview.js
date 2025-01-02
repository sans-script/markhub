import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkMermaidPlugin from "remark-mermaid-plugin";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const Preview = ({ input, editorWidth, bottomDivHeight, isTransitioning }) => {
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
  return (
    <div
      style={{
        width: `${100 - editorWidth}%`,
        height: `${100 - bottomDivHeight}%`,
        padding: "0px 10px",
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
        {convertLatexSyntax(input)}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;
