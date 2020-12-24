import React from "react";
type Props = {};
export const Filter: React.FC<Props> = () => {
  return (
    <div
      css={{
        background: "var(--white)",
        height: 350,
        opacity: 0.5,
        position: "sticky",
        top: 110,
        width: 350,
      }}
    >
      Filter
    </div>
  );
};
