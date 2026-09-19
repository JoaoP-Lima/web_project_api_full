import { useState, useContext } from "react";

import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";
export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState("");
    const [errorMessageDescription, setErrorMessageDescription] = useState("");
    const [isValidName, setIsValidName] = useState(currentUser.name.length >= 2 && currentUser.name.length <= 40);
    const [isValidDescription, setIsValidDescription] = useState(currentUser.about.length >= 2 && currentUser.about.length <= 200);
    const [isLoading, setIsLoading] = useState(false);


  const handleNameChange = (event) => {
    if(event.target.validity.valid) {
      setErrorName(false);
      setErrorMessageName("");
      setIsValidName(true);

    }else{
      setErrorName(true);
      setErrorMessageName(event.target.validationMessage)
      setIsValidName(false);
    }

    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {

     if(event.target.validity.valid) {
      setErrorDescription(false);
      setErrorMessageDescription("");
      setIsValidDescription(true);
    }else{
      setErrorDescription(true);
      setErrorMessageDescription(event.target.validationMessage)
      setIsValidDescription(false);
    }

    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    handleUpdateUser({ name, about: description }).finally(() => {
      setIsLoading(false);
    });
  };
  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="editProfileForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__label">
        <input
          className={`popup__input popup__input_type_name ${errorName ? " popup__input_type_error" : ""}`}
          name="name"
          placeholder="Nome"
          type="text"
          minLength="2"
          maxLength="40"
          required
          id="name-input"
          value={name}
          onChange={handleNameChange}
        />
      </label>
 <span className={`${errorName ? "popup__input-error_active " : ""}`}>{errorMessageName}</span>
      <label className="popup__label">
        <input
          className={`popup__input popup__input_type_description ${errorDescription ? " popup__input_type_error" : ""}`}
          name="about"
          placeholder="Sobre mim"
          type="text"
          minLength="2"
          maxLength="200"
          required
          id="description-input"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <span className={`${errorDescription ? "popup__input-error_active " : ""}`}>{errorMessageDescription}</span>
      <button className="button popup__button" type="submit" disabled={!(isValidName && isValidDescription)}>
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
