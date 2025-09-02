import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // ou outro tema do highlight.js
import "../markdown-styles.css";
import "../markdown-code.css";

interface MarkdownProps {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <div className="markdown-content prose prose-headings:text-blue-600 prose-a:text-sky-500 hover:prose-a:text-sky-700 prose-table:border-gray-200 max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
