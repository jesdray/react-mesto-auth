import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { loggedInContext } from '../contexts/loggedInContext'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState();
  const [userEmail, setUserEmail] = React.useState()
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [openPopupSuccess, setOpenPopupSuccess] = React.useState(false);
  const [success, setSuccess] = React.useState();


  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      api.usersMe(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email)
            setLoggedIn(!loggedIn);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    tokenCheck()
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((data) => {
        const cards = data.map((item) => {
          return {
            _id: item._id,
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner,
          };
        });
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    document.addEventListener("keydown", handleEscClose);
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    document.addEventListener("keydown", handleEscClose);
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    document.addEventListener("keydown", handleEscClose);
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setOpenPopupSuccess(false)
    setSelectedCard(null);
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleCardClick(data) {
    document.addEventListener("keydown", handleEscClose);
    setSelectedCard(data);
  }

  function handleUpdateUser(data) {
    api
      .editDataUser(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(url) {
    console.log(url.avatar);
    api
      .editAvatarUser(url.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLike(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    api
      .removeCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <loggedInContext.Provider value={loggedIn}>
          <BrowserRouter>
            <Switch>
              <div className="page">
                <Header
                  setLoggedIn={setLoggedIn}
                  userEmail={userEmail}
                />
                <ProtectedRoute
                  path='/'
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                />
                <Route>
                  {loggedIn && <Redirect to='/' />}
                </Route>
                <Route path='/sign-in'>
                  <Login
                    setLoggedIn={setLoggedIn} />
                </Route>
                <Route path='/sign-up'>
                  <Register
                    setLoggedIn={setLoggedIn}
                    openPopup={setOpenPopupSuccess}
                    setSuccess={setSuccess}
                  />
                </Route>
                <Footer />
                <InfoTooltip
                  isOpen={openPopupSuccess}
                  onClose={closeAllPopups}
                  success={success} />
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </div>
            </Switch>
          </BrowserRouter>
        </loggedInContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
