import { useState } from "react";

export default function NewCard(props) {
  const [name, setName] = useState({});
  const [link, setLink] = useState({});
  const [errorName, setErrorName] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorLink, setErrorLink] = useState(false);
  const [errorMessageLink, setErrorMessageLink] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLink, setIsValidLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event) => {
    if (event.target.validity.valid) {
      setErrorName(false);
      setErrorMessageName("");
      setIsValidName(true);
    } else {
      setErrorName(true);
      setErrorMessageName(event.target.validationMessage);
      setIsValidName(false);
    }

    setName(event.target.value);
  };
  const handleLinkChange = (event) => {
    if (event.target.validity.valid) {
      setErrorLink(false);
      setErrorMessageLink("");
      setIsValidLink(true);
    } else {
      setErrorLink(true);
      setErrorMessageLink(event.target.validationMessage);
      setIsValidLink(false);
    }

    setLink(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    props.onAddPlaceSubmit({ name, link }).finally(() => {
      setIsLoading(false);
    });
  };
  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="newPlaceForm"
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_place-name ${errorName ? " popup__input_type_error" : ""}`}
        name="name"
        placeholder="Título"
        required
        type="text"
        minLength="3"
        maxLength="30"
        id="place-name-input"
        onChange={handleNameChange}
      />
      <span className={`${errorName ? "popup__input-error_active " : ""}`}>
        {errorMessageName}
      </span>
      <input
        className={`popup__input popup__input_type-link ${errorLink ? " popup__input_type_error" : ""}`}
        name="link"
        placeholder="Link de Imagem"
        required
        type="url"
        id="place-link-input"
        onChange={handleLinkChange}
      />
      <span className={`${errorLink ? "popup__input-error_active " : ""}`}>
        {errorMessageLink}
      </span>
      <button
        className="button popup__button"
        type="submit"
        disabled={!(isValidName && isValidLink)}
      >
        {isLoading ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}
