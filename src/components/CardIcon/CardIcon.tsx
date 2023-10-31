import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import capitalize from "lodash/capitalize";
import { useEffect, useId, useState } from "react";
import { CopyButton, DownloadButton } from "./ButtonActions";
import { useResponsive } from "../../context/responsive-context";
import { usePress } from "react-aria";
import { copyToClipboard } from "./helper";
import { useSnackbar } from "../../context/snackbar-context";
import { gtmEvent } from "../../utils/gtm-tracking";
import { trackFullstoryEvent } from "../../utils/fullstory-tracking";

type CardIconProps = {
  iconUrlSrc: string;
  iconName: string;
  filename: string;
};

export const CardIcon: React.FC<CardIconProps> = ({ iconUrlSrc, iconName, filename }) => {
  const svgWrapperId = useId();
  const { onOpenSnackbar } = useSnackbar();
  const { isDesktop } = useResponsive();

  const { pressProps } = usePress({
    onPress: (event) => {
      if (!isDesktop) {
        gtmEvent({ eventAction: "Click", eventName: "copy_svg_icon", eventLabel: `Copy ${filename}` });
        trackFullstoryEvent("copy_svg_icon", { filename });

        const svg = event.target.querySelector("svg");
        const code =
          svg && svg.parentElement
            ? svg.parentElement.innerHTML.replace(`<!--?xml version="1.0" encoding="UTF-8"?-->`, "")
            : null;

        if (code) {
          if (document.activeElement instanceof HTMLButtonElement) {
            document.activeElement.blur();
          }

          copyToClipboard({
            value: code.toString(),
            onCopied: () => onOpenSnackbar("notification", `SVG copied to clipboard! 📄`),
          });
        }
      }
    },
  });

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
  }, [iconName, svgWrapperId, iconUrlSrc]);

  return (
    <>
      <Wrapper
        {...pressProps}
        title={capitalize(iconName)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        loadingIcon={loadingIcon}
        tabIndex={0}
        role="button"
      >
        {loadingIcon && <PlaceholderIcon />}
        <SvgWrapper
          id={svgWrapperId}
          animate={!loadingIcon ? "visible" : "hidden"}
          variants={{ visible: { opacity: 1, scale: 1 }, hidden: { opacity: 0, scale: 0 } }}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {hover && isDesktop && (
            <WrapperButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <CopyButton iconUrlSrc={iconUrlSrc} filename={filename} />
              <DownloadButton filename={filename} iconUrlSrc={iconUrlSrc} />
            </WrapperButton>
          )}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ loadingIcon: boolean }>(({ loadingIcon }) => ({
  borderRadius: 12,
  background: "transparent",
  ":hover, :focus, :focus-visible": {
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
  "@media (max-width: 960px)": {
    width: "100%",
    minWidth: 85,
    maxWidth: 85,
    height: 85,
  },
}));

const SvgWrapper = styled(motion.div)({
  userSelect: "none",
  WebkitUserDrag: "none",
  transition: "all 250ms",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  svg: {
    height: 24,
    width: 24,
  },
  "@media (max-width: 960px)": {
    width: 35,
  },
});

const PlaceholderIcon = styled.div({
  width: "75px",
  height: "75px",
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
