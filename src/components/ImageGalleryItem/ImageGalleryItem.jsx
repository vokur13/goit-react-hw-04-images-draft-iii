import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import {
  ImageGalleryListItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ImageGalleryListItem>
      <ImageGalleryItemImage
        src={item.webformatURL}
        alt={item.tags}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal
          largeImageURL={item.largeImageURL}
          tags={item.tags}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </ImageGalleryListItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
