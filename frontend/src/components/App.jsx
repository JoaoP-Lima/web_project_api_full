
import { useState, useEffect } from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "../components/Register";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [mainPopup, setMainPopup] = useState(null);
  const [infoTooltipPopup, setIsInfoTooltipPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(true);
  const [cards, setCards] = useState([]);
 const [token, setToken] = useState(() => localStorage.getItem("jwt") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return; 
    }
    api.token = token;

    }, [token]);

  useEffect(() => {
   if (!isLoggedIn) {
      return;
    }
  api.getInitialCard().then((data) => {
      setCards(data);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const checkToken = jwt ? auth.checkToken(jwt) : Promise.reject(null);

    checkToken
      .then((data) => {
        if (!data) {
          setCheckIsLoggedIn(false);
          return;
        } 
        
        setIsLoggedIn(true);
        setCurrentUser((prevUser) => ({ ...prevUser, email: data.email }));
        navigate("/");
      })

      .catch(() => {
        localStorage.removeItem("jwt");

        setIsLoggedIn(false);
      
      })
      .finally(() => {
        setCheckIsLoggedIn(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    api.getUserInfo().then((data) => {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        about: data.about,
        _id: data._id,
        avatar: data.avatar,
        name: data.name,
      }));
    });
  }, [isLoggedIn]);
  async function handleCardLike(card) {
    const isLiked = card.likes.some((like) => {
      return like === currentUser._id;
    });


    await api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id).then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id),
      );
    });
  }

  function handleOpenPopup(popup) {
    setMainPopup(popup);
  }

  function handleClosePopup() {
    setMainPopup(null);
  }

  function handleOpenInfoTooltipPopup(popup) {
    setIsInfoTooltipPopup(popup);
  }

  function handleCloseInfoTooltipPopup() {
    const success = infoTooltipPopup?.isSuccess;

    setIsInfoTooltipPopup(null);

    if (success) {
      navigate("/signin");
    }
  }

  const handleUpdateUser = (data) => {
    return api.updateUserInfo(data).then((newData) => {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        name: newData.name,
        about: newData.about,
      }));
      handleClosePopup();
    });
  };

  const handleUpdateAvatar = (avatar) => {
    return api.setUserAvatar(avatar).then((newData) => {
      
      setCurrentUser((prevUser) => ({
        ...prevUser,
        avatar: newData.avatar,
      }));
      handleClosePopup();
    });
  };

  const handleAddPlaceSubmit = (cardData) => {
    return api.addCard(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    });
  };

  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then((user) => {
        handleOpenInfoTooltipPopup({
          isSuccess: true,
          message: `Vitória! ${user.email} agora você está registrado.`,
        });
      })
      .catch((err) => {
        if (err.status === 400) {
          handleOpenInfoTooltipPopup({
            isSuccess: false,
            message: "Usuário já existe. Tente novamente.",
          });
        } else if (err.status === 500) {
          handleOpenInfoTooltipPopup({
            isSuccess: false,
            message: "Ocorreu um erro no servidor. Tente novamente mais tarde.",
          });
        }
      });
  };
  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("jwt", data.token);
          auth.checkToken(data.token).then((data) => {
            setCurrentUser((prevUser) => ({ ...prevUser, email: data.email }));
          });

          setIsLoggedIn(true);

          navigate("/");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          handleOpenInfoTooltipPopup({
            isSuccess: false,
            message: "Um dos campos foi preenchido incorretamente.",
          });
        } else if (err.status === 401) {
          handleOpenInfoTooltipPopup({
            isSuccess: false,
            message: "E-mail ou senha incorretos.",
          });
        } else if (err.status === 500) {
          handleOpenInfoTooltipPopup({
            isSuccess: false,
            message: "Ocorreu um erro no servidor. Tente novamente mais tarde.",
          });
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  };
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar, isLoggedIn }}
    >
      {checkIsLoggedIn ? null : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="page__content">
                  <Header
                    email={currentUser.email}
                    linkText="Sair"
                    linkTo="/signin"
                    onLogout={handleLogout}
                  />
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={mainPopup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />

                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <div className="page__content">
                  <Login
                    handleLogin={handleLogin}
                    onOpenPopup={handleOpenInfoTooltipPopup}
                    onClosePopup={handleCloseInfoTooltipPopup}
                    popup={infoTooltipPopup}
                  />
                </div>
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <div className="page__content">
                  <Register
                    onOpenPopup={handleOpenInfoTooltipPopup}
                    onClosePopup={handleCloseInfoTooltipPopup}
                    popup={infoTooltipPopup}
                    onRegister={handleRegistration}
                  />
                </div>
              )
            }
          />
        </Routes>
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;
