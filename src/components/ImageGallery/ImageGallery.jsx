import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem items={images} onClick={onClick} />
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
