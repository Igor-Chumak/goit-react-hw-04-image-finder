import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string,
    handleCloseModal: PropTypes.func.isRequired,
  };

  onClickOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.handleCloseModal();
    }
  };

  onClickEscape = e => {
    if (e.key === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onClickEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    const { largeImageURL } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.onClickOverlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      document.querySelector('#root_modal')
    );
  }
}
