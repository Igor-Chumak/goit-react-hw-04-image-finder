import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { inputValue } = this.state;
    let inputValueNormalize = inputValue.trim().toLowerCase();
    if (!inputValueNormalize) return;
    // e.currentTarget.search.value = inputValueNormalize;
    if (!this.props.onSubmit(inputValueNormalize)) {
      return;
    }
    form.reset();
    this.setState({ inputValue: '' });
  };

  handleChangeInput = e => {
    return this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChangeInput}
            required
          />
        </form>
      </header>
    );
  }
}
