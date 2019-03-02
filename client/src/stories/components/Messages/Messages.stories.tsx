import React from 'react';
import { storiesOf } from '@storybook/react';
import Messages, { MessageProps } from '../../../components/Messages';

const messageProps: MessageProps = {
  body: 'Cannot connect to server.',
  error: false
};

storiesOf('components / Messages', module)
  .add('error', () => <Messages {...messageProps} error />)
  .add('success', () => (
    <Messages {...messageProps} body={'Submitted successfully!'} />
  ));
