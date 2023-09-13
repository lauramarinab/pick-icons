import styled from "@emotion/styled";
import { useSnackbar } from "../../context/snackbar-context";
import { motion } from "framer-motion";
import { theme } from "../../theme/tokens";

type CopyButtonProps = {
  iconUrlSrc: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ iconUrlSrc }) => {
  const { onOpenSnackbar } = useSnackbar();
  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  const onCopySvg = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
      } else {
        navigator.clipboard
          .writeText(xhr.response)
          .then(function () {
            onOpenSnackbar("notification", `Great, SVG copied correctly! 📄`);
          })
          .catch(function () {
            onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
          });
      }
    };
  };

  return (
    <Button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: 0.2 }}
      onClick={() => onCopySvg()}
    >
      Copy SVG
    </Button>
  );
};

type DownloadButtonProps = {
  filename: string;
  iconUrlSrc: string;
};

export const DownloadButton: React.FC<DownloadButtonProps> = ({ filename, iconUrlSrc }) => {
  const { onOpenSnackbar } = useSnackbar();
  const downloadUrl = `https://raw.githubusercontent.com/lauramarinab/pick-icons/main/public${iconUrlSrc}`;

  const onDownloadIcon = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", downloadUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
      } else {
        const blob = new Blob([xhr.response], { type: "svg" });
        downloadBlob(blob, filename);
        onOpenSnackbar("notification", `WoW, SVG downloaded correctly! 💪🏼`);
      }
    };
  };

  return (
    <Button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: 0.2 }}
      onClick={() => onDownloadIcon()}
    >
      Download
    </Button>
  );
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename || "download";
  a.click();
};

const Button = styled(motion.button)({
  width: "100%",
  height: "100%",
  transition: "all 200ms",
  background: "rgba(13, 71, 161, 0.35)",
  color: theme.colors.white,
  borderRadius: 8,
  ":hover, :focus, :focus-visible": {
    background: "rgba(13, 71, 161, 0.80)",
  },
});
