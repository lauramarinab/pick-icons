import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { CopyButton, DownloadButton } from "./ButtonActions";
import capitalize from "lodash/capitalize";

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

  return (
    <Wrapper
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
        variants={{ visible: { opacity: 1, scale: 1.1 }, hidden: { opacity: 0, scale: 0 } }}
        transition={{ duration: 0.3 }}
      />
      <AnimatePresence>
        {hover && (
          <WrapperButton
            css={{
              "@media (max-width: 960px)": {
                display: "none",
              },
            }}
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
  );
};

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
