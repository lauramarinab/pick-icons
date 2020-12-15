import React from "react";
type Props = {};
export const Filter: React.FC<Props> = () => {
  return (
    <div
      css={{
        width: 350,
        height: 350,
        background: "var(--white)",
        opacity: 0.5,
        position: "sticky",
        top: 110,
      }}
    >
      Filter
    </div>
  );
};
