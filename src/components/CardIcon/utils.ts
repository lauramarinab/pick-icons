import { MessageType } from "providers/SnackbarProvider";
import { gAEvent } from "utils/gtag";

export const onCopySvg = (
  isProd: boolean,
  filename: string,
  downloadUrl: string,
  el: React.MutableRefObject<HTMLTextAreaElement>,
  handleSnackbar: (messageType: MessageType, message: string) => void
) => {
  if (isProd) {
    const gAEventVariables = { action: "copy_icon", category: "Copy SVG Icon", label: `Copy ${filename}` };
    gAEvent(gAEventVariables);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", downloadUrl);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      handleSnackbar("error", "Mmh, oops! Something went wrong.");
    } else {
      el.current.value = xhr.response;
      document.body.appendChild(el.current);
      // Select text inside element
      el.current.select();
      // Copy text to clipboard
      document.execCommand("copy");
      document.body.removeChild(el.current);
      handleSnackbar("notification", "Great, SVG copied correctly! 📄");
    }
  };
};
