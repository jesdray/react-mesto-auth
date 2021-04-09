import React from "react";
import { api } from "../utils/api.js";
import { NavLink, useHistory } from 'react-router-dom';


function Register(props) {
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

        api.signUp(password, email)
            .then((data) => {
                props.openPopup(true)
                props.setSuccess(true)
                history.push('/sign-in')
                console.log(data);
            })
            .catch((err) => {
                props.openPopup(true)
                props.setSuccess(false)
                console.log(err);
            });
    }
    return (
        <form className='register'
            onSubmit={handleSubmit}>
            <h2 className='register__title' >Регистрация</h2>
            <input
                type='text'
                id='register-email'
                name='email'
                placeholder='Email'
                className='register__input'
                onChange={setNewEmail}
                value={email}
                required
            />
            <input
                type='password'
                id='register-password'
                name='password'
                placeholder='Пароль'
                className='register__input'
                onChange={setNewPassword}
                value={password}
                required
            />
            <button type='submit' className='register__button'>
                Зарегистрироваться
        </button>
            <NavLink className='register__link' to='/sign-in'>
                Уже зарегистрированы? Войти
        </NavLink>
        </form>
    )
}

export default Register