let editorGuideContent = `# Editor Capabilities Guide

This editor allows you to create and render a variety of content formats, including **Markdown**, **LaTeX formulas**, **Mermaid diagrams**, and **footnotes**. With the integration of these features, you can seamlessly generate rich documents for a wide range of use cases.

## AI-Assisted Editing

The editor integrates **AI** to assist with editing. You can simply start typing your content, and once you're ready, press **Ctrl + Enter** to send your input to the editor. The AI will help you structure and refine the content, and the updated text will be rendered in the editor's preview in real-time. This feature enables you to quickly generate high-quality documents without having to manually adjust the formatting or syntax.


## Mermaid Diagrams

The editor supports **Mermaid diagrams**, which allow you to create flowcharts, pie charts, bar charts, and other types of diagrams directly within your Markdown content. For example, you can use a pie chart to visually represent data distributions. Here's an example of a pie chart:

\`\`\`mermaid
pie
  title Sales Distribution
  "Product A" : 30
  "Product B" : 45
  "Product C" : 25
\`\`\`

Make sure to write the right mermaid syntax

## LaTeX Formulas

Mathematical expressions are rendered using /(/LaTeX/), allowing you to easily display complex formulas. You can use LaTeX to represent algebraic, calculus, or statistical equations. For example, the quadratic formula:

/[
x = /frac{-b /pm /sqrt{b^2 - 4ac}}{2a}
/]

Additionally, you can represent integrals and other advanced mathematical concepts. For instance, the formula for the definite integral:

/[
/int_a^b f(x) /, dx = F(b) - F(a)
/]

## Tables

In addition to diagrams and formulas, the editor also supports **tables** for structured data presentation. Tables allow you to organize information neatly and display it in rows and columns. Here is an example table of products:

| Product   | Price  | Quantity | Total       |
| --------- | ------ | -------- | ----------- |
| Product A | $10.00 | 20       | $200.00     |
| Product B | $15.50 | 30       | $465.00     |
| Product C | $12.00 | 25       | $300.00     |
| **Total** |        |          | **$965.00** |

## Footnotes

The editor also supports **footnotes**, allowing you to add references or additional information at the bottom of your document. Footnotes are easy to implement in Markdown by using a simple syntax:

Here's an example of a sentence with a footnote reference[^1].

[^1]: This is the footnote text.

When rendered, the footnote will appear as a small reference link in the text, and the full note will be displayed at the bottom of the page.

## Combining All Features

You can combine **Mermaid diagrams**, **LaTeX formulas**, **tables**, and **footnotes** within a single document to create rich, interactive content. The editor processes these elements and renders them in real-time, giving you the flexibility to produce dynamic documents that include data visualizations, mathematical expressions, structured data, and references.

Whether you're writing documentation, creating educational content, or building technical reports, this editor is designed to enhance your writing experience by supporting a wide variety of formats and features.`;

editorGuideContent = editorGuideContent.replace(/\//g, '\\');

export default editorGuideContent;
