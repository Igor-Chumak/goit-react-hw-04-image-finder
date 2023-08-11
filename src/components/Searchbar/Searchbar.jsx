import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    let inputValueNormalize = inputValue.trim().toLowerCase();
    if (!inputValueNormalize) return;
    if (!onSubmit(inputValueNormalize)) {
      return;
    }
    form.reset();
    setInputValue('');
  };

  const handleChangeInput = e => {
    return setInputValue(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButton_label}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
