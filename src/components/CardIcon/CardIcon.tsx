import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { theme } from "../../theme/tokens";
import { useSnackbar } from "../../context/snackbar-context";

type IconType = "outline" | "solid";

const Wrapper = styled.div<{ loadingIcon: boolean }>(({ loadingIcon }) => ({
  borderRadius: 12,
  background: "transparent",
  ":hover": {
    background: "#F5F8FB",
  },
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  minWidth: 95,
  maxWidth: 95,
  height: 95,
  transition: "all 250ms",
  filter: loadingIcon ? "blur(1px) " : "blur(0px)",
  "&@media (max-width: 650px)": {
    width: "100%",
    maxWidth: "100%",
  },
}));

type IconSet = {
  strokeColor: string;
  strokeWidth?: string;
  fill: string;
};

const SvgWrapper = styled(motion.div)<{ iconSet: IconSet }>({
  width: 45,
  userSelect: "none",
  WebkitUserDrag: "none",
});

const PlaceholderIcon = styled.div({
  width: "75px",
  height: "75px",
});

type CardIconProps = {
  iconUrlSrc: string;
  iconName: string;
  filename: string;
};

export const CardIcon: React.FC<CardIconProps> = ({ iconUrlSrc, iconName, filename }) => {
  const svgWrapperId = iconName.replace(/ /g, "-");

  const [hover, setHover] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(true);

  useEffect(() => {
    const svgWrapper = document.getElementById(svgWrapperId);
    if (svgWrapper) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", iconUrlSrc);
      xhr.send();
      xhr.onload = () => {
        if (xhr.status !== 200) {
          setLoadingIcon(true);
        } else {
          setLoadingIcon(false);
          svgWrapper.innerHTML = xhr.response;
        }
      };
    }
  }, [iconName]);

  const iconType = iconUrlSrc.split("/")[2] as IconType;

  return (
    <Wrapper onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} loadingIcon={loadingIcon}>
      {loadingIcon && <PlaceholderIcon />}
      <SvgWrapper
        id={svgWrapperId}
        animate={!loadingIcon ? "visible" : "hidden"}
        variants={{ visible: { opacity: 1, scale: 1.1 }, hidden: { opacity: 0, scale: 0 } }}
        transition={{ duration: 0.3 }}
        iconSet={
          iconType === "outline"
            ? { strokeColor: "#000", strokeWidth: "1px", fill: "none" }
            : { strokeColor: "none", fill: "#000" }
        }
      />
      <AnimatePresence>
        {hover && (
          <WrapperButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CopyButton iconUrlSrc={iconUrlSrc} />
            <DownloadButton filename={filename} iconUrlSrc={iconUrlSrc} />
          </WrapperButton>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

type CopyButtonProps = {
  iconUrlSrc: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ iconUrlSrc }) => {
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
            onOpenSnackbar("notification", "Great, SVG copied correctly! 📄");
            // onOpenSnackbar("error", "Mmh, oops! Something went wrong.");
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

const DownloadButton: React.FC<DownloadButtonProps> = ({ filename, iconUrlSrc }) => {
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
        onOpenSnackbar("notification", "WoW! Thanks.");
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
  ":hover": {
    background: "rgba(13, 71, 161, 0.80)",
  },
});

const WrapperButton = styled(motion.div)({
  position: "absolute",
  padding: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  gap: 8,
});
