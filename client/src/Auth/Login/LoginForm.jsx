import React from 'react';
import { Link } from 'react-router-dom';
import { useFormInput } from '../../helper/customHooks';

const LoginForm = ({ login, loading }) => {

  const email = useFormInput('');
  const password = useFormInput('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    login({
      variables: {
        email: email.value,
        password: password.value
      }
    });
  }

  return (
    <section>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" name="email" {...email} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" minLength="6" name="password" {...password} />
        </div>
        <div>
          <button disabled={loading}>{loading ? 'Loggin in...' : 'Login'}</button>
        </div>
        <span>or</span>
        <Link to="/register">Register</Link>
      </form>
    </section>
  );
}

export default LoginForm;