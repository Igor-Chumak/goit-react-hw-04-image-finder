import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  Button,
  ImageGallery,
  Loader,
  Modal,
  Searchbar,
  getDataQuery,
} from 'components';

Notify.init({
  width: '500px',
  fontSize: '25px',
  position: 'center-top',
  timeout: '2000',
  messageMaxLength: 150,
  distance: '20px',
  showOnlyTheLastOne: true,
  clickToClose: true,
  closeButton: true,
  opacity: 1,
  warning: {
    background: '#af3e86',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0, 0, 0, 0.466)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,1)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [showLargeImage, setShowLargeImage] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!searchValue) return;
    setShowLoader(true);

    getDataQuery(searchValue, page)
      .then(dataSearchResults => {
        if (dataSearchResults.hits.length === 0) {
          throw new Error('Sorry, no results found !');
        }
        setImages(prevImages => [...prevImages, ...dataSearchResults.hits]);
        setShowLoadMore(page < Math.ceil(dataSearchResults.totalHits / 12));
      })
      .catch(error => {
        setShowLoadMore(false);
        Notify.warning(error.message);
      })
      .finally(setShowLoader(false));
  }, [searchValue, page]);

  const onSubmit = dataForm => {
    if (dataForm === searchValue) {
      return;
    }
    setImages([]);
    setSearchValue(dataForm);
    setPage(1);
    setShowLargeImage('');
    setShowLoadMore(false);
    setShowLoader(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenCloseModal = url => {
    setShowLargeImage(url);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <main>
        <ImageGallery
          imagesList={images}
          showLargeImage={handleOpenCloseModal}
        />
        {showLoadMore && <Button click={handleLoadMore} />}
        {showLoader && <Loader />}
        {showLargeImage && (
          <Modal
            largeImageURL={showLargeImage}
            handleCloseModal={handleOpenCloseModal}
          />
        )}
      </main>
    </>
  );
};
