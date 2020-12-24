import React from "react";

export type MessageType = "error" | "notification";

type SnackbarContext = {
  message: string;
  messageType: MessageType | null;
  onClose: () => void;
  onOpenSnackbar: (messageType: MessageType, message: string) => void;
  visible: boolean;
};

const SnackbarContext = React.createContext<SnackbarContext>({} as SnackbarContext);

const SnackbarProvider: React.FC = ({ children }) => {
  const timeout = React.useRef<NodeJS.Timeout>();

  const [visible, setVisible] = React.useState<boolean>(false);
  const [messageType, setMessageType] = React.useState<MessageType | null>(null);
  const [message, setMessage] = React.useState<string>("");

  const onOpenSnackbar = (messageType: MessageType, message: string) => {
    setVisible(true);
    setMessageType(messageType);
    setMessage(message);
  };

  const onClose = () => {
    setVisible(false);
    setMessageType(null);
    setMessage("");
  };

  React.useEffect(() => {
    if (visible && messageType === "notification") {
      timeout.current = setTimeout(() => {
        onClose();
      }, 6000);
    }
  }, [visible, messageType]);

  React.useEffect(() => {
    document.body.addEventListener("click", onClose, true);
    return () => {
      document.body.removeEventListener("click", onClose, true);
      if (timeout.current && messageType === "notification") {
        clearTimeout(timeout.current);
      }
    };
  }, [messageType]);

  return (
    <SnackbarContext.Provider value={{ message, messageType, onClose, onOpenSnackbar, visible }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider, SnackbarContext };
