import { css } from "@emotion/core";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";

import { gradientText } from "sharedStyles";

const wrapperStyle = css`
  min-width: 260px;
  min-height: 180px;
  max-width: 500px;
  position: fixed;
  background: var(--white);
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
  buttonSection: JSX.Element;
  message: string | JSX.Element;
  open: boolean;
  title: string;
  onClose?: () => void;
};

const Dialog: React.FC<Props> = ({ buttonSection, message, onClose, open, title }) => {
  const el = React.useRef<HTMLDivElement>(document.createElement("div"));

  React.useEffect(() => {
    const element = el.current;
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
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
