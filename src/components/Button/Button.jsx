import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ click, page, pageMax }) => {
  return (
    <button type="button" className={css.Button} onClick={click}>
      {page > 0 ? `${page} / ${pageMax} ` : ''}Load more
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
};
