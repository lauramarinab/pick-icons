import { css } from "@emotion/core";
import React from "react";

const image = require("../../assets/no-icon-found.svg");

const NoIconFound: React.FC = () => {
  return (
    <div css={{ display: "flex", justifyContent: "center", paddingTop: 60 }}>
      <img alt="No icon found" css={{ width: "30%" }} src={image} />
    </div>
  );
};

export { NoIconFound };
