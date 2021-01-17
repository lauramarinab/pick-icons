import styled from "@emotion/styled";
import { AddCollectionButton } from "components/ui/AddCollectionButton";
import { CopyButton } from "components/ui/CopyButton";
import { DownloadButton } from "components/ui/DownloadButton";
import { AnimatePresence, motion } from "framer-motion";
import { useCheckAdBlocker } from "hooks/useCheckAdBlocker";
import React from "react";

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
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid #dadada; */
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
  }, [svgWrapperId, iconUrlSrc]);

  const iconType = iconUrlSrc.split("/")[2] as IconType;

  return (
    <Wrapper loadingIcon={loadingIcon} onMouseEnter={(_) => setHover(true)} onMouseLeave={(_) => setHover(false)}>
      <AnimatePresence>
        {hover && (
          <motion.div
            animate={{ opacity: 1 }}
            css={{
              "> *": {
                justifySelf: "center",
              },
              "> :first-of-type": {
                borderRight: "2px solid white",
              },
              "> :last-of-type": {
                borderLeft: "2px solid white",
              },
              alignItems: "center",
              borderBottom: "2px solid white",
              display: "grid",
              gridTemplateColumns: "33.3% 33.3% 33.3%",
              height: 50,
              position: "absolute",
              width: "100%",
            }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <CopyButton filename={filename} iconUrlSrc={iconUrlSrc} />
            <DownloadButton filename={filename} iconUrlSrc={iconUrlSrc} />
            <AddCollectionButton filename={filename} iconUrlSrc={iconUrlSrc} disabled />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        css={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          padding: "50px 0px",
          paddingBottom: 20,
        }}
      >
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
        <h5 css={{ fontWeight: 700, letterSpacing: 1, textAlign: "center" }}>{iconName}</h5>
      </div>
    </Wrapper>
  );
};

export { CardIcon };
