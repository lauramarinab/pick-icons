import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { MessageType, SnackbarContext } from "../providers/SnackbarProvider";
import { css } from "@emotion/core";
import { pink, water } from "../sharedStyles";

const Wrapper = styled(motion.div)<{ messageType: MessageType }>`
  background: ${water};
  border-radius: 20px;
  padding: 20px;
  position: fixed;
  left: 30px;
  font-weight: 700;
  font-size: 12px;
  z-index: 1;
  ${(props) =>
    props.messageType === "error" &&
    css`
      background: ${pink};
      color: white;
    `}
`;

const animation = (messageType: MessageType | null) => {
  if (!messageType) return null;

  if (messageType === "notification") {
    return {
      hidden: {
        bottom: -80,
        opacity: 0,
      },
      visible: {
        opacity: 1,
        bottom: 30,
        scale: [1, 1.3, 1, 1],
        rotate: [0, -5, 5, 0],
      },
    };
  } else {
    return {
      hidden: {
        bottom: -80,
        opacity: 0,
      },
      visible: {
        opacity: 1,
        bottom: 30,
      },
    };
  }
};

const Snackbar: React.FC = () => {
  const { visible, message, messageType } = React.useContext(SnackbarContext);

  const animationSnackbar = animation(messageType);

  const snackbarIsVisible = visible && messageType && animationSnackbar;

  return (
    <AnimatePresence>
      {snackbarIsVisible && (
        <Wrapper
          initial={animationSnackbar!.hidden}
          animate={animationSnackbar!.visible}
          exit={animationSnackbar!.hidden}
          messageType={messageType!}
        >
          {message}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export { Snackbar };
