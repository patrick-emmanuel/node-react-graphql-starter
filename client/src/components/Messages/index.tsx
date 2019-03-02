import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './styles.css';

export interface MessageProps {
  body: string;
  error: boolean;
}

const Message: React.StatelessComponent<MessageProps> = ({ body, error }) => {
  const [isTimeout, setIsTimeout] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimeout(false);
    }, 6000);

    return function cleanup() {
      clearTimeout(timeout);
    };
  });

  let cardStyle = classNames('absolute fade ph3 pv2 white shadow-2', {
    'bg-dark-red': error,
    'bg-dark-green': !error
  });

  if (isTimeout) {
    return (
      <div className={cardStyle}>
        <h4 className="mt1 mb1">{error ? 'Error' : 'Success'}</h4>
        <p className="f6">{body}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Message;
