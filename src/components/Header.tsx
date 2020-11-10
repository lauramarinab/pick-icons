import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { gradientText } from "../sharedStyles";
import { GithubIcon } from "./ui/GithubIcon";

const Wrapper = styled.div`
  width: 100vw;
  height: 340px;
  background: #000;
  padding: 40px;
  color: #fff;
`;

const titleStyle = css`
  font-family: "Roboto Mono", monospace;
  font-size: 50px;
  font-weight: 200;
  margin-bottom: 10px;
  position: relative;
  left: -4px;
  user-select: none;
`;

const GitHubButton = styled.a<{ hover: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  svg {
    fill: ${(props) => (props.hover ? "#00FFD1" : "#ffffff")};
  }
  span {
    margin-left: 15px;
    font-size: 14px;
    color: #ffffff;
    position: relative;
    top: 1px;
    ${(props) =>
      props.hover &&
      css`
        font-weight: 700;
        ${gradientText};
      `};
  }
`;

const Header: React.FC<{ iconsNumber: number }> = ({ iconsNumber }) => {
  const [hoverGithub, setHoverGithub] = React.useState<boolean>(false);

  return (
    <Wrapper
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      `}
    >
      <div>
        <h1 css={titleStyle}>
          Pick
          <span
            css={css`
              font-weight: 700;
            `}
          >
            Icons
          </span>
        </h1>
        <span
          css={css`
            font-size: 25px;
            ${gradientText};
          `}
        >
          Handmade SVG icons with much loveee
        </span>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        `}
      >
        <div
          css={css`
            font-size: 14px;
          `}
        >
          <span
            css={css`
              margin-right: 30px;
            `}
          >
            {iconsNumber} Icons
          </span>
          <span>MIT Licensed</span>
        </div>
        <GitHubButton
          href="https://github.com/lauramarinab/pick-icons"
          target="__blank"
          hover={hoverGithub}
          onMouseEnter={(_) => setHoverGithub(true)}
          onMouseLeave={(_) => setHoverGithub(false)}
        >
          <GithubIcon />
          <span>View on GitHub</span>
        </GitHubButton>
      </div>
    </Wrapper>
  );
};

export { Header };
