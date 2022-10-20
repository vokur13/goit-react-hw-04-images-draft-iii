import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import {
  ImageGalleryListItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = { isModalOpen: false };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { item } = this.props;
    return (
      <ImageGalleryListItem>
        <ImageGalleryItemImage
          src={item.webformatURL}
          alt={item.tags}
          onClick={this.openModal}
        />
        {isModalOpen && (
          <Modal
            largeImageURL={item.largeImageURL}
            tags={item.tags}
            onClose={this.closeModal}
          />
        )}
      </ImageGalleryListItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
