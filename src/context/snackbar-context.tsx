import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";

export type MessageType = "error" | "notification";

type SnackbarContext = {
  visible: boolean;
  messageType: MessageType | null;
  message: string;
  onOpenSnackbar: (messageType: MessageType, message: string) => void;
  onClose: () => void;
};

export const SnackbarContext = createContext<SnackbarContext>({} as SnackbarContext);

export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const timeout = useRef<NodeJS.Timeout>();

  const [visible, setVisible] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType | null>(null);
  const [message, setMessage] = useState<string>("");

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

  useEffect(() => {
    if (visible && messageType === "notification") {
      timeout.current = setTimeout(() => {
        onClose();
      }, 6000);
    }
  }, [visible, messageType]);

  useEffect(() => {
    document.body.addEventListener("click", onClose, true);
    return () => {
      document.body.removeEventListener("click", onClose, true);
      if (timeout.current && messageType === "notification") {
        clearTimeout(timeout.current);
      }
    };
  }, [messageType]);

  return (
    <SnackbarContext.Provider value={{ visible, messageType, message, onOpenSnackbar, onClose }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
