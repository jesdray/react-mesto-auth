import React from "react";
import successImage from '../images/success.svg'
import failImage from '../images/fail.svg'

function InfoTooltip(props) {

  if (props.success) {
    return (
      <div
        className={`popup popup__success ${props.isOpen && 'popup_opened'}`}
      >
        <div className="popup__overlay" onClick={props.onClose}></div>
        <div
          className="popup__container popup__success"
        >
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          ></button>
          <img src={successImage} className='popup__success-image'></img>
          <h2 className='popup__success-title'>Вы успешно зарегистрировались!</h2>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className={`popup popup__success ${props.isOpen && 'popup_opened'}`}
      >
        <div className="popup__overlay"></div>
        <div
          className="popup__container popup__success"
        >
          <button
            type="button"
            className="popup__close"
          ></button>
          <img src={failImage} className='popup__success-image'></img>
          <h2 className='popup__success-title'>Что-то пошло не так! Попробуйте ещё раз.</h2>
        </div>
      </div>
    )
  }
  return (
    <div className="popup popup__success">
    </div>
  )
}

export default InfoTooltip;