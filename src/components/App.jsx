import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { handleSearch } from './api';
export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isModalOpen: false,
    selectedImageURL: '',
    loadMore: false,
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.loadImages();
    }
  }
  handleSearchSubmit = query => {
    if (!query.trim()) {
      alert('Please enter a valid search query.');
      return;
    }

    this.setState({ query, images: [], page: 1 });
  };

  loadImages = async () => {
    const { query, page } = this.state;

    try {
      const { hits, totalHits } = await handleSearch(query, page);
      if (hits.length === 0) {
        return alert('Not find');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (imageURL, tags) => {
    this.setState({
      isModalOpen: true,
      selectedImageURL: imageURL,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedImageURL: '',
      tags: '',
    });
  };

  render() {
    const { images, isLoading, error, isModalOpen, selectedImageURL, tags, loadMore } =
      this.state;

    return (
      <div className={CSS.App}>
       
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length>0 && <ImageGallery images={images} openModal={this.openModal}/>}
        
        {isLoading && <Loader /> }
        {loadMore && !isLoading && images.length > 0 &&  (
          <Button onClick={this.loadMoreImages} />
        )}
        {error && <p className={CSS.Error}>Somthing went wrong</p>}
        {isModalOpen && (
          <Modal
            imageURL={selectedImageURL}
            onClose={this.closeModal}
            tags={tags}
          />
        )}
      </div>
    );
  }
}
