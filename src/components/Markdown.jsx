import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import '../markdown-styles.css';

const Markdown = ({ content }) => {
  return (
    <div className="markdown-content prose prose-headings:text-blue-600 prose-a:text-sky-500 hover:prose-a:text-sky-700 prose-table:border-gray-200 max-w-none">
    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {content}
    </ReactMarkdown>
    </div>
  );
};

export default Markdown;
