import IconButton from "./iconbutton";
import React from "react";
import { useChatStore } from "@/store/main/chatStore";
interface TextAreaProps {
  text?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  onIconClick?: () => void;
}

const TextArea = ({
  text,
  onChange,
  disabled = false,
  onIconClick,
}: TextAreaProps) => {
  const ref = React.useRef<HTMLTextAreaElement | null>(null);

  const prompt = useChatStore((state) => state.prompt);
  const setPrompt = useChatStore((state) => state.setPrompt);
  const handleSend = useChatStore((state) => state.handleSend);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = ref.current;
    if (!el) return;

    if (e.target.value.trim() === "") {
      el.style.height = "40px";
    } else {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }

    el.scrollTop = el.scrollHeight;

    onChange?.(e.target.value);
    setPrompt(e.target.value);
  };

  async function handleEnter(e: any) {
    if (e.key === "Enter") {
      await handleSend();
    }
  }

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "40px";
  }, []);

  return (
    <div className="relative w-full border p-3 gap-3 flex rounded-full items-center backdrop-blur-3xl">
      <IconButton icon="Plus" tooltip="Upload a file" onClick={onIconClick} />

      <textarea
        ref={ref}
        value={prompt}
        placeholder={text}
        onChange={handleInput}
        disabled={disabled}
        onKeyDown={handleEnter}
        rows={1}
        className={`
          w-full max-h-40 resize-none text-xl py-1 outline-none transition-all bg-transparent
          placeholder:text-muted-foreground placeholder:text-xl 
          overflow-hidden
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
        `}
      />

      <IconButton
        icon="Send"
        tooltip="Send Message"
        onClick={handleSend}
        isSolid
      />
    </div>
  );
};

export default TextArea;
