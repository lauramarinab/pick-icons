import React from "react";
import { css } from "@emotion/core";

const image = require("../../assets/no-icon-found.svg");

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  padding-top: 60px;
`;

const NoIconFound: React.FC = () => {
  return (
    <div css={wrapperStyle}>
      <img
        src={image}
        alt="No icon found"
        css={css`
          width: 30%;
        `}
      />
    </div>
  );
};

export { NoIconFound };
