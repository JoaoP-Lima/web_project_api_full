import Popup from "./Main/components/Popup/Popup";
import checkIcon from "../images/success.svg";
import errorIcon from "../images/error.svg";

function InfoTooltip({ isSuccess, onClosePopup, message }) {
  return (
    <Popup onClose={onClosePopup} title={null}>
      {isSuccess ? (
        <>
          <img src={checkIcon} alt="Sucesso" className="popup__success-icon" />
          <p className="popup__success-title">{message}</p>
        </>
      ) : (
        <>
          <img src={errorIcon} alt="Erro" className="popup__error-icon" />
          <p className="popup__error-title">{message}</p>
        </>
      )}
    </Popup>
  );
}

export default InfoTooltip;
