import React from 'react';
import { Link } from 'react-router-dom';
import { useFormInput } from '../../utils/customHooks';
import { LoginVariables } from '../types/Login';
import { ApolloError } from 'apollo-client';

export interface LoginFormProps {
  login: (variables: LoginVariables) => void;
  loading: boolean;
  error: ApolloError;
}

const LoginForm: React.StatelessComponent<LoginFormProps> = ({
  login,
  loading,
  error
}) => {
  const email = useFormInput('');
  const password = useFormInput('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      email: email.value,
      password: password.value
    });
  };

  return (
    <section>
      <div className="bg-red white">{error && error.message}</div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" name="email" {...email} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" minLength={6} name="password" {...password} />
        </div>
        <div>
          <button disabled={loading}>
            {loading ? 'Loggin in...' : 'Login'}
          </button>
        </div>
        <span>or</span>
        <Link to="/signup">Register</Link>
      </form>
    </section>
  );
};

export default LoginForm;
