import { useContext, useState } from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../context/AuthContext.jsx';

export default function Auth() {
  const [mode, setMode] = useState('signup');
  const { signup, login, myinfo, user } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    if (mode === 'login') {
      login(data.email, data.password);
    } else if (mode === 'signup') {
      signup(data.email, data.password, data.username);
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" placeholder="Enter your email" id="email" {...register('email', { required: "Email is required" })} />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your username"
                id="username"
                {...register("username", {
                  required: mode === "signup" ? "Username is required" : false,
                })}
              />
              {errors.username && (
                <p className="form-error">{errors.username.message}</p>
              )}
            </div>
          )}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password" id="password" {...register('password', { required: "Password is required", minLength: { value: 6, message: 'Password must be at least 6 characters' }, maxLength: { value: 100, message: 'Password must be at most 100 characters' } })} />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
            <button className="btn btn-primary btn-large" type="submit">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
          </form>
          <div className="auth-switch">
            {mode === 'signup' ? (
              <p>Already have an account? <span className="auth-link" onClick={() => setMode('login')}>Login here</span></p>
            ) : (
              <p>Don't have an account? <span className="auth-link" onClick={() => setMode('signup')}>Sign up here</span></p>
            )}
          </div>
          <h1>{user ? `Welcome, ${user.username}!` : ''}</h1>
        </div>
      </div> 
    </div>
  );
}