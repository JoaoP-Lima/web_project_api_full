
import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";

import CurrentUserContext from "../../contexts/CurrentUserContext";


import Card from "./components/Card/Card";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Novo Local",
    children: <NewCard onAddPlaceSubmit={props.onAddPlaceSubmit} />,
  };
  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Alterar a foto da perfil",
    children: <EditAvatar />,
  };

  

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <div className="profile__image-overlay">
            <button
              aria-label="Editar Avatar"
              type="button"
              className="profile__icon"
              onClick={() => props.onOpenPopup(editAvatarPopup)}
            ></button>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => props.onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => props.onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onOpenPopup={props.onOpenPopup}
              onClosePopup={props.onClosePopup}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              isOwner={card.owner === currentUser._id}
              
            />
          ))}
        </ul>
      </section>
      {props.popup && (
        <Popup onClose={props.onClosePopup} title={props.popup.title} isImagePopup={props.popup.isImagePopup}>
          {props.popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
