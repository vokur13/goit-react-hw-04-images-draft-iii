import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, largeImageURL, tags }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleBackDropClic(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <Overlay onClick={handleBackDropClic}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
