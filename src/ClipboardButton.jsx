import { useState } from "react";

export default function CopyToClipboardButton(props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(props.text);
    setCopied(true);
  }

  return (
    <button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy url to clipboard"}
    </button>
  );
}