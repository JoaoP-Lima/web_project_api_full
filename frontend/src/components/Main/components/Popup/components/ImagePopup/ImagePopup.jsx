export default function ImagePopup(props) {
    const { name, link} = props.card|| {};
    
    return (
        <>
     
     <img alt={`Imagem de ${name}`} className="popup__image" src={link}  />
          <p className="popup__caption">{name}</p>
          </>
    )
}