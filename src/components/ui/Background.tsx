import { CSSObject } from "@emotion/styled";
import React from "react";

const grain = require("../../assets/grain-max.jpg");

const absoluteStyle: CSSObject = {
  position: "absolute",
  top: 0,
};

export const Background: React.FC = () => {
  return (
    <div css={{ height: "100vh", position: "fixed", top: 0, userSelect: "none", width: "100vw", zIndex: -1 }}>
      <img alt="" css={{ height: "100vh", opacity: 0.2, width: "100vw" }} src={grain} />
      <div
        css={{
          background: "radial-gradient(49.83% 42.58% at 85.69% 86.91%, #06F2E4 0%, #FF9900 100%)",
          height: "100%",
          opacity: "0.2",
          width: "100%",
          ...absoluteStyle,
        }}
      />
      <div
        css={{
          height: "100%",
          width: "100%",
          ...absoluteStyle,
          background:
            "radial-gradient(71.89% 95.31% at 37.64% -1.95%, #00FFD1 0%, rgba(255, 0, 184, 0.36) 51.05%, rgba(255, 122, 0, 0.46) 100%);",
        }}
      />
    </div>
  );
};
