import { Link } from "react-router-dom";
import Header from "./Header/Header";
import { useState } from "react";
import InfoTooltip from "./InfoTooltip";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin({ email, password });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login page__section">
      <Header linkText="Cadastre-se" linkTo="/signup" />
      <form className=" login__form" onSubmit={handleSubmit}>
        <legend className="login__title">Entrar</legend>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          className="login__input"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          id="password"
          placeholder="Senha"
          className="login__input"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <button className="login__button" type="submit">
          Entrar
        </button>
        <Link to="/signup" className="login__link">
          Ainda não é membro? Inscreva-se aqui!
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

export default Login;
