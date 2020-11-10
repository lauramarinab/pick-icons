import React from "react";
import { css } from "@emotion/core";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { gradientText } from "sharedStyles";

const wrapperStyle = css`
  min-width: 260px;
  min-height: 180px;
  max-width: 500px;
  position: fixed;
  background: #ffffff;
  box-shadow: 0px 0px 8px -1px rgba(0, 0, 0, 0.25);
  left: 50%;
  bottom: calc(50% + 1px);
  transform: translate(-50%, 50%);
  padding: 35px;
  border-radius: 30px;

  @media (max-width: 768px) {
    width: calc(100vw - 40px);
    max-width: none;
  }
`;

const titleStyle = css`
  font-size: 23px;
  font-family: "Roboto Mono", monospace;
  ${gradientText};
  margin-bottom: 30px;
`;

const messageStyle = css`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.5px;
  margin-bottom: 30px;
`;

const buttonSectionStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

type Props = {
  open: boolean;
  onClose?: () => void;
  title: string;
  message: string | JSX.Element;
  buttonSection: JSX.Element;
};

const Dialog: React.FC<Props> = ({ open, onClose, message, title, buttonSection }) => {
  const el = React.useRef<HTMLDivElement>(document.createElement("div"));

  React.useEffect(() => {
    document.body.appendChild(el.current);
    return () => {
      document.body.removeChild(el.current);
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div css={wrapperStyle}>
          <h2 css={titleStyle}>{title}</h2>
          <div css={messageStyle}>{message}</div>
          <div css={buttonSectionStyle}>{buttonSection}</div>
        </div>
      )}
    </AnimatePresence>,
    el.current
  );
};

export { Dialog };
