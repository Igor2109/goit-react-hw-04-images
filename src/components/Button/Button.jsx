import React, { Component } from 'react';

export class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" className='Button' onClick={onClick}>
        Load more
      </button>
    );
  }
}