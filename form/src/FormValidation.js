import { useState, useEffect, useCallback } from 'react';

const useFormValidation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setButtonDisabled] = useState(true);


  const validateName = useCallback(() => {
    if (name.length < 3) {
      setErrors(prevErrors => (
        { ...prevErrors, name: 'Name must be at least 3 characters long.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, name: '' }));
    }
  }, [name]);

  const validateEmail = useCallback(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors(prevErrors => (
        { ...prevErrors, email: 'Please enter a valid email address.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }
  }, [email]);

  const validatePassword = useCallback(() => {
    if (password.length < 6) {
      setErrors(prevErrors => (
        { ...prevErrors, password: 'Password must be at least 6 characters long.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, password: '' }));
    }
  }, [password]);

  const validateConfirmPassword = useCallback(() => {
    if (password !== confirmPassword) {
      setErrors(prevErrors => (
        { ...prevErrors, confirmPassword: 'Passwords do not match.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
  }, [name, email, password, confirmPassword, validateName, validateEmail, validatePassword, validateConfirmPassword]);

  
  useEffect(() => {
    const isValid = !Object.values(errors).some(error => error);
    setButtonDisabled(!isValid);
  }, [errors]);

  return {
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
  };
};

export default useFormValidation;
