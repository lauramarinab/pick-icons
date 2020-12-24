import React from "react";

import { SnackbarContext } from "../../providers/SnackbarProvider";

import { Button } from "sharedStyles";
import { gAEvent } from "utils/gtag";

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename || "download";
  a.click();
};

interface Props {
  filename: string;
  iconUrlSrc: string;
}

const DownloadButton: React.FC<Props> = ({ filename, iconUrlSrc }) => {
  const isProd = process.env.NODE_ENV === "production";

  const { onOpenSnackbar } = React.useContext(SnackbarContext);

  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  const onDownloadIcon = () => {
    if (isProd) {
      const gAEventVariables = { action: "download_icon", category: "Download Icon", label: `Download ${filename}` };
      gAEvent(gAEventVariables);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
      } else {
        const blob = new Blob([xhr.response], { type: "svg" });
        downloadBlob(blob, filename);
        onOpenSnackbar("notification", "WoW! Thanks.");
      }
    };
  };

  return <Button onClick={onDownloadIcon}>Download SVG</Button>;
};

export { DownloadButton };
