import React from "react";
import logo from '../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { loggedInContext } from '../contexts/loggedInContext'

function Header(props) {
    const history = useHistory()
    const loggedIn = React.useContext(loggedInContext);
    const [login, setLogin] = React.useState(true);

    function switchLink() {
        setLogin(!login)
    }

    function signOut() {
        localStorage.removeItem('token');
        setLogin(true);
        props.setLoggedIn(false)
        history.push('/sign-in');
    }

    if (loggedIn) {
        return (
            <header className="header">
                <img src={logo} alt="Место.Россия" className="header__logo" />
                <div className='header__box'>
                <p className='header__email'>{props.userEmail}</p>
                <Link className='header__link' to='/sign-in' onClick={signOut}>Выйти</Link>
                </div>
            </header>
        )
    } else {
        if (login) {
            return (
                <header className="header">
                    <img src={logo} alt="Место.Россия" className="header__logo" />
                    <Link className='header__link' to='/sign-up' onClick={switchLink}>Регистрация</Link>
                </header>
            )
        }
        return (
            <header className="header">
                <img src={logo} alt="Место.Россия" className="header__logo" />
                <Link className='header__link' to='/sign-in' onClick={switchLink}>Войти</Link>
            </header>
        )
    }
}

export default Header