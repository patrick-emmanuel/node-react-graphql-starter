import React from 'react';
import { useFormInput } from '../../utils/customHooks';
import { SignUpVariables } from '../types/SignUp';

export interface SignUpFormProps {
  signUp: (variables: SignUpVariables) => void;
  loading: boolean;
}

const SignUpForm: React.StatelessComponent<SignUpFormProps> = ({
  signUp,
  loading
}) => {
  const email = useFormInput('');
  const name = useFormInput('');
  const password = useFormInput('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({
      name: name.value,
      email: email.value,
      password: password.value
    });
  };

  return (
    <section>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" {...name} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" {...email} />
        </div>
        <div>
          <label>Password (6 minimum characters)</label>
          <input type="password" minLength={6} name="password" {...password} />
        </div>
        <div>
          <button disabled={loading}>
            {loading ? 'Loading...' : 'Sign up'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
