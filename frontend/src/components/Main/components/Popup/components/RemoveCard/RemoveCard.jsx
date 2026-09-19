export default function RemoveCard (props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onDeleteCard();
        props.onClosePopup();


    }
    return (
     <form className="popup__form" name="deleteCardForm" onSubmit={handleSubmit}>
            <button type="submit" className="button popup__button">Sim</button>
          </form>
    )
}