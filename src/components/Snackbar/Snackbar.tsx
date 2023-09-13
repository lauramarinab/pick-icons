import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { theme } from "../../theme/tokens";
import { MessageType, useSnackbar } from "../../context/snackbar-context";

const Wrapper = styled(motion.div)<{ messageType: MessageType }>(({ messageType }) => ({
  background: messageType !== "error" ? theme.colors.primary : "red",
  borderRadius: 8,
  padding: 12,
  position: "fixed",
  right: 32,
  fontSize: 14,
  zIndex: 1,
  color: messageType === "error" ? theme.colors.white : undefined,
}));

const animation = (messageType: MessageType | null) => {
  if (!messageType) return null;

  if (messageType === "notification") {
    return {
      hidden: { bottom: -80, opacity: 0 },
      visible: { opacity: 1, bottom: 32 },
    };
  } else {
    return {
      hidden: { bottom: -80, opacity: 0 },
      visible: { opacity: 1, bottom: 32 },
    };
  }
};

export const Snackbar: React.FC = () => {
  const { visible, message, messageType } = useSnackbar();

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
