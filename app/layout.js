import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "LaTeX & Markdown Renderer",
  description: "Render LaTeX and Markdown in real-time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}
