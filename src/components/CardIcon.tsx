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

const CardIcon: React.FC<{ iconPath: string; iconName: string }> = ({ iconPath, iconName }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Wrapper onMouseEnter={(_) => setHover(true)} onMouseLeave={(_) => setHover(false)}>
      <Icon src={iconPath} alt={"This Icon calls " + iconName} />
      <h5
        css={css`
          font-weight: 400;
          letter-spacing: 1px;
          text-align: center;
        `}
      >
        {iconName}
      </h5>
      <DownloadButton visible={hover} filename={iconName} />
    </Wrapper>
  );
};

export { CardIcon };
