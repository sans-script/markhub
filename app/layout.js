import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "LaTeX & Markdown Renderer",
  description: "Renderize LaTeX e Markdown em tempo real",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
