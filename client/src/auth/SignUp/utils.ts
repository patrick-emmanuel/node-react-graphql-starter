import { ApolloError } from 'apollo-client';

export const formatSignUpError = (error: ApolloError) => {
  let message: string;
  const splittedMessage: string[] = error.message.split('=');
  if (splittedMessage.length > 1) {
    if (splittedMessage[1].trim() === 'email') {
      message = 'This email already exists';
    } else {
      message = error.message;
    }
  }
  return message;
};
