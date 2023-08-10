import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ imagesList, showLargeImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {imagesList.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          imageURL={webformatURL}
          largeImageURL={largeImageURL}
          showLargeImage={showLargeImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  showLargeImage: PropTypes.func.isRequired,
  imagesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};
