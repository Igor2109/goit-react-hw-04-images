import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
    render() {
      const { image, onClick } = this.props;
  
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
  }