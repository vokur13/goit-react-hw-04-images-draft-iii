import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as API from 'services/api';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { ImageGalleryError } from 'components/ImageGalleryError';
import { ImageGallery } from 'components/ImageGallery';
import { ImageGalleryPending } from 'components/ImageGalleryPending';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGalleryHub extends Component {
  static defaultProps = {
    step: 1,
  };

  state = {
    page: this.props.page,
    gallery: this.props.gallery,
    query: this.props.query,
    total: this.props.total,
    totalHits: this.props.totalHits,
    error: false,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    if (prevProps.query !== query) {
      try {
        this.setState({
          status: Status.PENDING,
        });
        const { totalHits, hits } = await API.getGallery(query, page);
        if (hits.length === 0) {
          this.setState({ status: Status.REJECTED });
          return toast.error(
            `Sorry, there are no images matching your search query for '${query}'. Please try again.`
          );
        }
        this.setState({
          status: Status.RESOLVED,
          gallery: [...hits],
          total: hits.length,
          totalHits: totalHits,
        });
        return toast.success(`Hooray! We found ${totalHits} images.`);
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
        toast.error(`Sorry, something goes wrong: ${error.message}`);
      }
    }
    if (prevState.page !== this.state.page) {
      try {
        this.setState({
          status: Status.PENDING,
        });
        const { hits } = await API.getGallery(query, page);
        this.setState(prevState => ({
          status: Status.RESOLVED,
          gallery: [...prevState.gallery, ...hits],
          total: prevState.total + hits.length,
        }));
      } catch (error) {
        this.setState({ error: true, status: Status.REJECTED });
        console.log(error);
      }
    }
  }

  handleMoreImage = () => {
    const { step } = this.props;
    this.setState(prevState => ({
      page: prevState.page + step,
    }));
  };

  render() {
    const { query } = this.props;
    const { gallery, error, status, total, totalHits } = this.state;

    if (status === 'idle') {
      return <div>Please let us know your query item</div>;
    }
    if (status === 'pending') {
      return <ImageGalleryPending query={query} data={gallery} />;
    }
    if (status === 'rejected') {
      return <ImageGalleryError message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery data={gallery} />;
          {total < totalHits ? (
            <Box display="flex" justifyContent="center">
              <Button type="button" onClick={this.handleMoreImage}>
                Load more
              </Button>
            </Box>
          ) : null}
          {total === totalHits
            ? toast.warn(
                "We're sorry, but you've reached the end of search results."
              )
            : null}
        </>
      );
    }
  }
}

ImageGalleryHub.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string,
  gallery: PropTypes.array,
  total: PropTypes.number,
  totalHits: PropTypes.number,
};

// {
//   /* <p>Whoops, something went wrong, no item upon query {query} found</p> */
// }

// // error.response.data
