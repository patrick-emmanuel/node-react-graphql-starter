import React from 'react';
import { useFormInput } from '../../helper/customHooks';


const RegisterForm = ({ register, loading }) => {

  const email = useFormInput('');
  const name = useFormInput('');
  const password = useFormInput('');

  const handleRegister = (e) => {
    e.preventDefault();
    register({
      variables: {
        name: name.value,
        email: email.value,
        password: password.value
      }
    });
  }

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
          <input type="password" minLength="6" name="password" {...password} />
        </div>
        <div>
          <button disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </div>
      </form>
    </section>
  );
}

export default RegisterForm;