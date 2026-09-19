import Header from "./Header/Header";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister({ email, password });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="register page__section">
      <Header linkText="Faça o login" linkTo="/signin" />
      <form className="register__form" onSubmit={handleSubmit}>
        <legend className="register__title">Inscrever-se</legend>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          className="register__input"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Senha"
          className="register__input"
          onChange={handlePasswordChange}
          value={password}
        />
        <button className="register__button" type="submit">
          Inscrever-se
        </button>
        <Link to="/signin" className="register__link">
          Já é um membro? Faça o login aqui!
        </Link>
      </form>
      {props.popup && (
        <InfoTooltip
          isSuccess={props.popup.isSuccess}
          onClosePopup={props.onClosePopup}
          message={props.popup.message}
        />
      )}
    </div>
  );
}

export default Register;
