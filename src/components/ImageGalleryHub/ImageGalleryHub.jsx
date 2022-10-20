import { useState, useEffect, useMemo } from 'react';
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

export function ImageGalleryHub({
  page,
  perPage,
  query,
  gallery,
  total,
  totalHits,
}) {
  const [_page, setPage] = useState(page);
  const [_gallery, setGallery] = useState(gallery);
  const [_total, setTotal] = useState(total);
  const [_totalHits, setTotalHits] = useState(totalHits);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(false);
  const [_perPage] = useState(perPage);
  const [loadMore, setLoadMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setPage(page);
    setGallery(gallery);
    setTotal(total);
    setTotalHits(totalHits);
  }, [gallery, page, total, totalHits]);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    async function fetchAssets() {
      try {
        const { totalHits, hits } = await API.getGallery(
          query,
          _page,
          _perPage
        );
        console.log(totalHits, hits);
        setGallery(prevState => [...prevState, ...hits]);
        setTotal(prevState => prevState + hits.length);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
      } catch (error) {
        console.log(error);
        setError(true);
        toast.error(`Sorry, something goes wrong: ${error.message}`);
        setStatus(Status.REJECTED);
      }
    }
    fetchAssets();
  }, [_perPage, _page, query]);

  useEffect(() => {
    if (!_totalHits) {
      return;
    }
    setTotalPages(Math.ceil(_totalHits / _perPage));
    if (_page === totalPages) {
      toast.warn("We're sorry, but you've reached the end of search results.");
    }
  }, [_perPage, _totalHits, _page, totalPages]);

  useEffect(() => {
    if (!query) {
      return;
    }
    if (_total === 0) {
      toast.error(
        `Sorry, there are no images matching your search query for '${query}'. Please try again.`
      );
    }
  }, [_total, query]);

  useEffect(() => {
    if (!_totalHits) {
      return;
    }
    toast.success(`Hooray! We found ${_totalHits} images.`);
  }, [_totalHits]);

  function handleMoreImage() {
    setPage(prevState => prevState + 1);
  }

  if (status === Status.IDLE) {
    return <div>Please let us know your query item</div>;
  }
  if (status === Status.PENDING) {
    return <ImageGalleryPending query={query} data={_gallery} />;
  }
  if (status === Status.REJECTED) {
    return <ImageGalleryError message={error.message} />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery data={_gallery} />;
        {_total < _totalHits ? (
          <Box display="flex" justifyContent="center">
            <Button type="button" onClick={handleMoreImage}>
              Load more
            </Button>
          </Box>
        ) : null}
      </>
    );
  }
}

// export class protoImageGalleryHub extends Component {
//   static defaultProps = {
//     step: 1,
//   };

//   state = {
//     page: this.props.page,
//     gallery: this.props.gallery,
//     query: this.props.query,
//     total: this.props.total,
//     totalHits: this.props.totalHits,
//     error: false,
//     status: Status.IDLE,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { query } = this.props;
//     const { page } = this.state;

//     if (prevProps.query !== query) {
//       try {
//         this.setState({
//           status: Status.PENDING,
//         });
//         const { totalHits, hits } = await API.getGallery(query, page);
//         if (hits.length === 0) {
//           this.setState({ status: Status.REJECTED });
//           return toast.error(
//             `Sorry, there are no images matching your search query for '${query}'. Please try again.`
//           );
//         }
//         this.setState({
//           status: Status.RESOLVED,
//           gallery: [...hits],
//           total: hits.length,
//           totalHits: totalHits,
//         });
//         return toast.success(`Hooray! We found ${totalHits} images.`);
//       } catch (error) {
//         this.setState({ error: true, status: Status.REJECTED });
//         console.log(error);
//         toast.error(`Sorry, something goes wrong: ${error.message}`);
//       }
//     }
//     if (prevState.page !== this.state.page) {
//       try {
//         this.setState({
//           status: Status.PENDING,
//         });
//         const { hits } = await API.getGallery(query, page);
//         this.setState(prevState => ({
//           status: Status.RESOLVED,
//           gallery: [...prevState.gallery, ...hits],
//           total: prevState.total + hits.length,
//         }));
//       } catch (error) {
//         this.setState({ error: true, status: Status.REJECTED });
//         console.log(error);
//       }
//     }
//   }

//   handleMoreImage = () => {
//     const { step } = this.props;
//     this.setState(prevState => ({
//       page: prevState.page + step,
//     }));
//   };

//   render() {
//     const { query } = this.props;
//     const { gallery, error, status, total, totalHits } = this.state;

//     if (status === 'idle') {
//       return <div>Please let us know your query item</div>;
//     }
//     if (status === 'pending') {
//       return <ImageGalleryPending query={query} data={gallery} />;
//     }
//     if (status === 'rejected') {
//       return <ImageGalleryError message={error.message} />;
//     }
//     if (status === 'resolved') {
//       return (
//         <>
//           <ImageGallery data={gallery} />;
//           {total < totalHits ? (
//             <Box display="flex" justifyContent="center">
//               <Button type="button" onClick={this.handleMoreImage}>
//                 Load more
//               </Button>
//             </Box>
//           ) : null}
//           {total === totalHits
//             ? toast.warn(
//                 "We're sorry, but you've reached the end of search results."
//               )
//             : null}
//         </>
//       );
//     }
//   }
// }

ImageGalleryHub.propTypes = {
  //   page: PropTypes.number.isRequired,
  //   query: PropTypes.string,
  //   gallery: PropTypes.array,
  //   total: PropTypes.number,
  //   totalHits: PropTypes.number,
};

// {
//   /* <p>Whoops, something went wrong, no item upon query {query} found</p> */
// }

// // error.response.data
