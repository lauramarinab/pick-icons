import { SnackbarContext } from "providers/SnackbarProvider";
import React from "react";
import { gAEvent } from "utils/gtag";
import { ActionButton } from "./ActionButton";
import { copyIcon } from "./icons/copyIcon";

interface Props {
  filename: string;
  iconUrlSrc: string;
  disabled?: boolean;
}

const CopyButton: React.FC<Props> = ({ filename, iconUrlSrc, disabled }) => {
  const el = React.useRef<HTMLTextAreaElement>(document.createElement("textarea"));

  const isProd = process.env.NODE_ENV === "production";

  const { onOpenSnackbar } = React.useContext(SnackbarContext);

  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  const onCopySvg = () => {
    if (isProd) {
      const gAEventVariables = { action: "copy_icon", category: "Copy SVG Icon", label: `Copy ${filename}` };
      gAEvent(gAEventVariables);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
      } else {
        el.current.value = xhr.response;
        document.body.appendChild(el.current);
        // Select text inside element
        el.current.select();
        // Copy text to clipboard
        document.execCommand("copy");
        document.body.removeChild(el.current);
        onOpenSnackbar("notification", "Great, SVG copied correctly! 📄");
      }
    };
  };

  return (
    <ActionButton onClick={onCopySvg} disabled={disabled}>
      {copyIcon}
    </ActionButton>
  );
};

export { CopyButton };
