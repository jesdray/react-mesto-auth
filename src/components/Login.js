import React from "react";
import { api } from "../utils/api.js";
import { useHistory } from 'react-router-dom';


function Login(props) {
  const history = useHistory()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function setNewEmail(e) {
    setEmail(e.target.value)
  }

  function setNewPassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    api.signIn(password, email)
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        props.setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form className='login'
      onSubmit={handleSubmit}>
      <h2 className='login__title' >Вход</h2>
      <input
        type='text'
        id='login-email'
        name='email'
        placeholder='Email'
        className='login__input'
        onChange={setNewEmail}
        value={email}
        required
      />
      <input
        type='password'
        id='login-password'
        name='password'
        placeholder='Пароль'
        className='login__input'
        onChange={setNewPassword}
        value={password}
        required
      />
      <button type='submit' className='login__button'>
        Войти
        </button>
    </form>
  )
}

export default Login