import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { DownloadButton } from "./ui/DownloadButton";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  border: 1px solid #dadada;
  overflow-y: hidden;
  position: relative;
  min-width: 250px;
  max-width: 300px;
  @media (max-width: 650px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Icon = styled.img`
  width: 50px;
  margin: 20px;
  user-select: none;
  -webkit-user-drag: none;
`;

interface Props {
  iconUrlSrc: string;
  iconName: string;
  filename: string;
}

const CardIcon: React.FC<Props> = ({ iconUrlSrc, iconName, filename }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Wrapper onMouseEnter={(_) => setHover(true)} onMouseLeave={(_) => setHover(false)}>
      <Icon src={iconUrlSrc} alt={"This Icon calls " + iconName} />
      <h5
        css={css`
          font-weight: 400;
          letter-spacing: 1px;
          text-align: center;
        `}
      >
        {iconName}
      </h5>
      <DownloadButton visible={hover} iconUrlSrc={iconUrlSrc} filename={filename} />
    </Wrapper>
  );
};

export { CardIcon };
