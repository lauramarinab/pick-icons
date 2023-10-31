import { useSnackbar } from "../../context/snackbar-context";
import { trackFullstoryEvent } from "../../utils/fullstory-tracking";
import { gtmEvent } from "../../utils/gtm-tracking";
import { Button } from "../Button";
import { copyToClipboard } from "./helper";

type CopyButtonProps = {
  iconUrlSrc: string;
  filename: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ iconUrlSrc, filename }) => {
  const { onOpenSnackbar } = useSnackbar();
  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  const onCopySvg = () => {
    gtmEvent({ eventAction: "Click", eventName: "copy_svg_icon", eventLabel: `Copy ${filename}` });
    trackFullstoryEvent("copy_svg_icon", { filename });

    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
      } else {
        copyToClipboard({
          value: xhr.response.replace(`<?xml version="1.0" encoding="UTF-8"?>`, ""),
          onCopied: () => onOpenSnackbar("notification", `SVG copied to clipboard! 📄`),
        });
      }
    };
  };

  return <Button onPress={() => onCopySvg()}>Copy SVG</Button>;
};

type DownloadButtonProps = {
  filename: string;
  iconUrlSrc: string;
};

export const DownloadButton: React.FC<DownloadButtonProps> = ({ filename, iconUrlSrc }) => {
  const { onOpenSnackbar } = useSnackbar();
  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  const onDownloadIcon = () => {
    gtmEvent({ eventAction: "Click", eventName: "download_svg_icon", eventLabel: `Download ${filename}` });
    trackFullstoryEvent("download_svg_icon", { filename });

    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
      } else {
        const blob = new Blob([xhr.response], { type: "svg" });
        downloadBlob(blob, filename);
        onOpenSnackbar("notification", `SVG downloaded correctly! 💪🏼`);
      }
    };
  };

  return <Button onPress={() => onDownloadIcon()}>Download</Button>;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename || "download";
  a.click();
};
