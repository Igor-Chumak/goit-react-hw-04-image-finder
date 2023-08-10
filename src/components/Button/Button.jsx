import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ click }) => {
  return (
    <button type="button" className={css.Button} onClick={click}>
      Load more
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
};
