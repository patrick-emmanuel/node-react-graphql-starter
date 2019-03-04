import React from 'react';
import { useMessage } from './';
import MessageView from './MessageView';
import MessageContext from '.';

export interface Message {
  error: boolean;
  text: string;
  opened?: boolean;
}

export const Message: React.StatelessComponent = ({ children }) => {
  const { text, error, opened, setOpened, setMessage } = useMessage();
  const queue: Message[] = [];

  const pushMessage = (text: string, error = false) => {
    queue.push({
      text,
      error
    });
    if (opened) {
      setOpened(false);
    } else {
      processQueue();
    }
  };

  const processQueue = () => {
    if (queue.length > 0) {
      let { text, error } = queue.shift();
      setMessage({
        text,
        error
      });
      setOpened(true);
    }
  };

  if (!opened) {
    return (
      <>
        <MessageView error={error} text={text} />
        <MessageContext.Provider value={{ pushMessage }}>
          {children}
        </MessageContext.Provider>
      </>
    );
  } else {
    return null;
  }
};
