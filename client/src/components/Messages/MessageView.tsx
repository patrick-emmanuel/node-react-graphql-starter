import React from 'react';
import classNames from 'classnames';

export interface MessageViewProps {
  text: string;
  error: boolean;
}

const MessageView: React.StatelessComponent<MessageViewProps> = ({
  text,
  error
}) => {
  let cardStyle = classNames('absolute fade ph3 pv2 white shadow-2', {
    'bg-dark-red': error,
    'bg-dark-green': !error
  });

  return (
    <div className={cardStyle}>
      <h4 className="mt1 mb1">{error ? 'Error' : 'Success'}</h4>
      <p className="f6">{text}</p>
    </div>
  );
};
export default MessageView;
