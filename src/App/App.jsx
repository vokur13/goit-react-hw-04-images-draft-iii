import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
import { Searchbar } from 'components/Searchbar';
import { ImageGalleryHub } from 'components/ImageGalleryHub';

export class App extends Component {
  static defaultProps = {
    initialValue: 1,
  };
  state = {
    page: this.props.initialValue,
    query: '',
    gallery: [],
    total: null,
    totalHits: null,
  };

  handleFormSubmit = ({ query }) => {
    const q = query.trim().toLowerCase();
    if (q === '') {
      return toast.warn('Please let us know your query item');
    }
    this.setState({
      page: this.props.initialValue,
      query: q,
      gallery: [],
      total: null,
      totalHits: null,
    });
  };

  render() {
    const { page, query, gallery, total, totalHits } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGalleryHub
          page={page}
          query={query}
          gallery={gallery}
          total={total}
          totalHits={totalHits}
        />
        <ToastContainer position="top-left" autoClose={5000} />
      </>
    );
  }
}
