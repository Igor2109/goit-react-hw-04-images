import { useEffect } from "react";

export const Modal =({imageURL, tags, onClose}) => {
  useEffect(() => {

  const onEscapeKey = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };


  window.addEventListener('keydown', onEscapeKey);
  return()=>{
    window.removeEventListener('keydown', onEscapeKey);
  }
}, [onClose]);
  
const onOverlayClick = e => {
  if (e.currentTarget === e.target) {
    onClose();
  }
};

    return (
      <div className='Overlay' onClick={onOverlayClick}>
        <div className='Modal'>
          <img src={imageURL} alt={tags} width={800} />
        </div>
      </div>
    );
  }
