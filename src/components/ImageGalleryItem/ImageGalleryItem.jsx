
export const ImageGalleryItem = ({ image, onClick }) => {
  
      return (
        <li className='ImageGalleryItem' onClick={onClick}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className='ImageGalleryItem-image'
          />
        </li>
      );
    }
