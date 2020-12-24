import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { CopyButton } from "./ui/CopyButton";
import { DownloadButton } from "./ui/DownloadButton";

import { useCheckAdBlocker } from "hooks/useCheckAdBlocker";

type IconType = "outline" | "solid";

const Wrapper = styled.div<{ loadingIcon: boolean }>`
  transition: background 3s;
  background: transparent;
  :hover {
    background: radial-gradient(
      114.46% 159.17% at 76.94% -34.72%,
      rgba(0, 255, 209, 0.63) 0%,
      rgba(255, 0, 184, 0.37) 51.05%,
      rgba(255, 122, 0, 0.92) 100%
    );
  }
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #dadada;
  overflow-y: hidden;
  position: relative;
  min-width: 250px;
  max-width: 300px;
  transition: filter 0.3s;
  filter: ${(props) => (props.loadingIcon ? "blur(1px) " : "blur(0px)")};
  @media (max-width: 650px) {
    width: 100%;
    max-width: 100%;
  }
`;

type IconSet = {
  fill: string;
  strokeColor: string;
  strokeWidth?: string;
};

const SvgWrapper = styled(motion.div)<{ iconSet: IconSet }>`
  width: 80px;
  margin: 30px 10px 10px 10px;
  user-select: none;
  -webkit-user-drag: none;

  & > svg > path {
    fill: ${(props) => props.iconSet.fill};
    stroke-width: ${(props) => props.iconSet.strokeWidth};
    stroke: ${(props) => props.iconSet.strokeColor};
  }
`;

const WrapperButton = styled(motion.div)`
  position: absolute;
  transform: translateY(50%);
  padding: 10px;

  & div:first-of-type {
    margin-bottom: 15px;
  }
`;

const PlaceholderIcon = styled.div`
  width: 75px;
  height: 75px;
`;

interface Props {
  filename: string;
  iconName: string;
  iconUrlSrc: string;
}

const CardIcon: React.FC<Props> = ({ filename, iconName, iconUrlSrc }) => {
  const svgWrapperId = iconName.replace(/ /g, "-");
  const adBlockerActive = useCheckAdBlocker();

  const [hover, setHover] = React.useState(false);
  const [loadingIcon, setLoadingIcon] = React.useState(true);

  React.useEffect(() => {
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
    <Wrapper loadingIcon={loadingIcon} onMouseEnter={(_) => setHover(true)} onMouseLeave={(_) => setHover(false)}>
      {loadingIcon && <PlaceholderIcon />}
      <SvgWrapper
        animate={!loadingIcon ? "visible" : "hidden"}
        iconSet={
          iconType === "outline"
            ? { fill: "none", strokeColor: "var(--white)", strokeWidth: "1px" }
            : { fill: "var(--white)", strokeColor: "none" }
        }
        id={svgWrapperId}
        transition={{ duration: 0.3 }}
        variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1.1 } }}
      />
      <h5
        css={css`
          font-weight: 400;
          letter-spacing: 1px;
          text-align: center;
        `}
      >
        {iconName}
      </h5>
      <AnimatePresence>
        {hover && !adBlockerActive && (
          <WrapperButton
            animate={{ bottom: "50%" }}
            exit={{ bottom: "-10%" }}
            initial={{ bottom: "-10%" }}
            transition={{ duration: 0.2 }}
          >
            <CopyButton filename={filename} iconUrlSrc={iconUrlSrc} />
            <DownloadButton filename={filename} iconUrlSrc={iconUrlSrc} />
          </WrapperButton>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export { CardIcon };
