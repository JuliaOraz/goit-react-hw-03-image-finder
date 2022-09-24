import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getImages } from 'components/api/api-images';
import { Searchbar } from './Searchbar';
import { Loader } from 'components/Loader';

import { ImageGallery } from 'components/ImageGallery';
import { Button } from './Button';
import Modal from './Modal/Modal';
import styles from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    searchImages: '',
    page: 1,
    loading: false,
    error: null,
    openModal: false,
    contentModal: {
      tags: '',
      largeImageURL: '',
    },
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchImages !== this.state.searchImages) {
      this.fetchImage();
    }
  }

  fetchImage = async () => {
    const { page, searchImages, images } = this.state;

    this.setState({ loading: true });

    try {
      const data = await getImages(searchImages, page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
          total: data.total,
        };
      });
      if (page === 1 && data.total > 0) {
        toast.success(`We found ${data.total} images`);
      }
      if (page > 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  onSearchSubmit = searchImages => {
    this.setState({ searchImages, page: 1, images: [], error: null });
  };

  onCloseModal = () => {
    this.setState({
      openModal: false,
      contentModal: {
        tags: '',
        largeImageURL: '',
      },
    });
  };
  onOpenModal = contentModal => {
    this.setState({
      openModal: true,
      contentModal,
    });
  };

  scrollOnLoadButton = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight - 1000,
        behavior: 'smooth',
      });
    }, 100);
  };

  render() {
    const { loading, error, images, openModal, contentModal, total } =
      this.state;
    const { onOpenModal, fetchImage, onCloseModal, onSearchSubmit } = this;

    const checkBtn = images.length !== total && total !== null;
    return (
      <div className={styles.App}>
        <Searchbar onSearchSubmit={onSearchSubmit} />
        {loading && <Loader />}
        {error && <p className={styles.App_text}>Please try again later</p>}
        {images.length < 1 && (
          <div className={styles.App_text}>There's nothing here :(</div>
        )}
        <ImageGallery images={images} onClick={onOpenModal} />
        {checkBtn && <Button onClick={fetchImage} />}

        <ToastContainer autoClose={3000} />
        {openModal && (
          <Modal onClose={onCloseModal}>
            <img
              className={styles.App_modal}
              src={contentModal.largeImageURL}
              alt={contentModal.tags}
            />
          </Modal>
        )}
      </div>
    );
  }
}
