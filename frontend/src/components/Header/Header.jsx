import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import closeIcon from "../../images/close.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function Header({ email, linkText, linkTo, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useContext(CurrentUserContext);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  return (
    <div className="page__section">
      <header
        className={`header ${isMenuOpen ? "header__menu_is-active" : ""}`}
      >
        <div className="header__container">
          <img
            alt="Logotipo Around The U.S."
            className="header__logo"
            src={Logo}
          />
          {isLoggedIn && (
            <div className="header__menu">
              {isMenuOpen ? (
                <div className="header__menu-close" onClick={handleMenuClose}>
                  <img
                    alt="Fechar menu"
                    className="header__close-icon"
                    src={closeIcon}
                  />
                </div>
              ) : (
                <div className="header__menu-open" onClick={handleMenuOpen}>
                  <div className="header__menu-lines">
                    <hr className="header__line" />
                    <hr className="header__line" />
                    <hr className="header__line" />
                  </div>
                </div>
              )}
            </div>
          )}
          {!isLoggedIn && (
            <div className="header__info-no-email">
              <Link to={linkTo} className="header__link">
                {linkText}
              </Link>
            </div>
          )}
        </div>
        {email && (
          <div
            className={`header__info ${isMenuOpen ? "header__info_is-active" : ""}`}
          >
            <p className="header__email">{email}</p>
            <Link to={linkTo} className="header__link" onClick={onLogout}>
              {linkText}
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
export default Header;
