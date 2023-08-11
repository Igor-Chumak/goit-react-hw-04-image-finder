import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, handleCloseModal }) => {
  const onClickOverlay = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal('');
    }
  };

  useEffect(() => {
    const onClickEscape = e => {
      if (e.key === 'Escape') {
        handleCloseModal('');
      }
    };
    window.addEventListener('keydown', onClickEscape);
    return () => {
      window.removeEventListener('keydown', onClickEscape);
    };
  }, [handleCloseModal]);

  return createPortal(
    <div className={css.Overlay} onClick={onClickOverlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    document.querySelector('#root_modal')
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  handleCloseModal: PropTypes.func.isRequired,
};
