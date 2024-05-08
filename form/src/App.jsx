import React, { useMemo } from 'react';
import useFormValidation from './FormValidation';
import './App.css';

const App = React.memo(() => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isButtonDisabled,
  } = useFormValidation();

 
  const handleSubmit = useMemo(() => {
    return (e) => {
      e.preventDefault();
      if (!isButtonDisabled) {
        console.log('Form data:', { name, email, password });
      } else {
        console.log('Form submission failed due to validation errors.');
      }
    };
  }, [name, email, password, isButtonDisabled]);

  return (
    <form onSubmit={handleSubmit}>
      <div className='form_input'>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className='form_input'>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className='form_input'>
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div className='form_input'>
        <label>Confirm Password: </label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      </div>
      <center>
        <button type="submit" disabled={isButtonDisabled}>
          Submit
        </button>
      </center>
    </form>
  );
});

export default App;
