import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { Message } from './Message';

export const useMessage = () => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  const setMessage = (message: Message) => {
    const { text, error } = message;
    setText(text);
    setError(error);
  };

  useEffect(() => {
    if (text) {
      const opened = setTimeout(() => {
        setOpened(false);
      }, 3000);
      return function cleanup() {
        clearTimeout(opened);
      };
    }
  }, [text]);

  return {
    text,
    error,
    opened,
    setOpened,
    setMessage
  };
};

interface MessageContext {
  pushMessage: (text: string, error: boolean) => void;
}
const MessageContext = createContext<MessageContext>({
  pushMessage: undefined
});

export default MessageContext;
export * from './Message';
