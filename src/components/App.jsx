import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { handleSearch } from './api';
export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [tags, setTags] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await handleSearch(query, page);
        if (hits.length === 0) {
          return alert('Not found');
        }

        setImages(prevState => [...prevState, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      loadImages();
    }
  }, [query, page]);

  const handleSearchSubmit = query => {
    if (!query.trim()) {
      alert('Please enter a valid search query.');
      return;
    }

    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (imageURL, tags) => {

    setIsModalOpen(true)
    setSelectedImageURL(imageURL)
    setTags(tags)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImageURL('')
    setTags('')
  };


  return (
    <div className={CSS.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isLoading && <Loader />}
      {loadMore && !isLoading && images.length > 0 && (
        <Button onClick={loadMoreImages} />
      )}
      {error && <p className={CSS.Error}>Somthing went wrong</p>}
      {isModalOpen && (
        <Modal imageURL={selectedImageURL} onClose={closeModal} tags={tags} />
      )}
    </div>
  );
};
