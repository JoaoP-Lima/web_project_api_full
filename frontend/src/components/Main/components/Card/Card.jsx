import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useContext } from "react";
export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link } = props.card;
  const isLiked = props.card.likes.some((like) => {
    return like === currentUser._id;
  });

  const imagePopup = {
    title: null,
    children: <ImagePopup card={props.card} />,
    isImagePopup: true,
  };

  const removeCardPopup = {
    title: "Tem certeza?",
    children: (
      <RemoveCard
        onDeleteCard={handleDeleteClick}
        onClosePopup={props.onClosePopup}
      />
    ),
  };

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_is-active" : ""}`;
  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={`Imagem de ${name}`}
        onClick={() => props.onOpenPopup(imagePopup)}
      />

      {props.isOwner && (
        <button
          aria-label="Excluir cartão"
          className="card__delete-button"
          type="button"
          onClick={() => props.onOpenPopup(removeCardPopup)}
        ></button>
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botão de curtir"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
