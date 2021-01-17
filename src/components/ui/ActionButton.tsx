import React from "react";

export interface ActionButtonProps {
  disabled?: boolean;
  onClick: () => void;
}
export const ActionButton: React.FC<ActionButtonProps> = ({ disabled, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      css={{
        ":hover": {
          "> svg": {
            transform: disabled ? "" : "scale(1.1) translateZ(0px)",
          },
        },
        "> svg": {
          opacity: disabled ? 0.5 : 1,
          transition: "transform 0.3s, opacity 0.3s",
        },
        alignItems: "center",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};
