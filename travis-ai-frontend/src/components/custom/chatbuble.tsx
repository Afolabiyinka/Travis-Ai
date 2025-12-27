import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import IconButton from "./iconbutton";
import { CopyButton } from "../modern-ui/copy-button";

interface Props {
  text: string;
  isBot: boolean;
}

const ChatBubble = ({ text, isBot }: Props) => {
  return (
    <div
      className={`rounded-full p-3 px-6 max-w-[80%] whitespace-pre-wrap 
         ${isBot ? "" : "bg-purple-600 text-white"}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            return (
              <code
                className={`px-1 py-0.5 rounded text-sm bg-transparent  ${className}`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
      {isBot && (
        <span className="flex justify-between gap-6 w-fit p-1 rounded-full">
          <IconButton icon="ThumbsUp" tooltip="Like this response" />
          <CopyButton value={`${isBot ? text : ""}`} />
          <IconButton icon="RefreshCcw" tooltip="Regenerate" />
        </span>
      )}
    </div>
  );
};

export default ChatBubble;
