import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  Button,
  ImageGallery,
  Loader,
  Modal,
  Searchbar,
  getDataQuery,
} from 'components';

Notify.init({
  width: '500px',
  fontSize: '25px',
  position: 'center-top',
  timeout: '2000',
  messageMaxLength: 150,
  distance: '20px',
  showOnlyTheLastOne: true,
  clickToClose: true,
  closeButton: true,
  opacity: 1,
  warning: {
    background: '#af3e86',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0, 0, 0, 0.466)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,1)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

const INIT_STATE = {
  images: [],
  searchValue: '',
  page: 1,
  showLargeImage: '',
  showLoadMore: false,
  showLoader: false,
};

export class App extends Component {
  state = { ...INIT_STATE };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    if (prevState.page !== page || prevState.searchValue !== searchValue) {
      try {
        this.setState({ showLoader: true });
        const dataSearchResults = await getDataQuery(searchValue, page);
        if (dataSearchResults.hits.length === 0) {
          throw new Error('Sorry, no results found !');
        }
        this.setState({
          images: [...this.state.images, ...dataSearchResults.hits],
          // showLoadMore: dataSearchResults.hits.length === 12,
          showLoadMore: page < Math.ceil(dataSearchResults.totalHits / 12),
        });
      } catch (error) {
        this.setState({ showLoadMore: false });
        Notify.warning(error.message);
      } finally {
        this.setState({ showLoader: false });
      }
    }
  }

  onSubmit = dataForm => {
    if (dataForm === this.state.searchValue) {
      return;
    }
    this.setState({
      images: [],
      searchValue: dataForm,
      page: 1,
      toShowLargeImage: '',
      showLoadMore: false,
      showLoader: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  handleOpenCloseModal = url => {
    this.setState({
      showLargeImage: url,
    });
  };

  render() {
    const { images, showLoadMore, showLoader, showLargeImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <main>
          <ImageGallery
            imagesList={images}
            showLargeImage={this.handleOpenCloseModal}
          />
          {showLoadMore && <Button click={this.handleLoadMore} />}
          {showLoader && <Loader />}
          {showLargeImage && (
            <Modal
              largeImageURL={showLargeImage}
              handleCloseModal={this.handleOpenCloseModal}
            />
          )}
        </main>
      </>
    );
  }
}
