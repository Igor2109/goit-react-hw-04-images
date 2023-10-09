import React, { Component } from 'react';
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKey);
  }

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  onEscapeKey = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const {imageURL, tags} = this.props;


    return (
      <div className='Overlay' onClick={this.onOverlayClick}>
        <div className='Modal'>
          <img src={imageURL} alt={tags} width={800} />
        </div>
      </div>
    );
  }
}