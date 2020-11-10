import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { gradient } from "../../variables";
import { downloadIconGAEvent } from "utils/gtag";

const Button = styled(motion.div)`
  ${gradient};
  padding: 10px 30px;
  position: absolute;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  transform: translateY(50%);
  font-weight: 700;
`;

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename || "download";
  a.click();
};

interface Props {
  visible: boolean;
  iconUrlSrc: string;
  filename: string;
}

const DownloadButton: React.FC<Props> = ({ visible, iconUrlSrc, filename }) => {
  const { onOpenSnackbar } = React.useContext(SnackbarContext);

  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  return (
    <AnimatePresence>
      {visible && (
        <Button
          initial={{ bottom: "-10%" }}
          animate={{ bottom: "50%" }}
          exit={{ bottom: "-10%" }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            const gaEvent = { action: "file_download", category: "Downloads", label: `Download ${filename}` };
            downloadIconGAEvent(gaEvent);

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
          }}
        >
          Download SVG
        </Button>
      )}
    </AnimatePresence>
  );
};

export { DownloadButton };
