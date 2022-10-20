import PropTypes from 'prop-types';

export const ImageGalleryError = ({ message }) => {
  return <p>{message}</p>;
};

ImageGalleryError.propTypes = {
  message: PropTypes.string,
};
