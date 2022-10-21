import { useState, useEffect, useReducer } from 'react';
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

function setReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, page: state.page + action.payload };
    case 'gallery':
      return { ...state, gallery: [...state.gallery, ...action.payload] };
    default:
      throw new Error(`Unsupported action action type ${action.type}`);
  }
}

export function ImageGalleryHub({
  page,
  perPage,
  query,
  gallery,
  total,
  totalHits,
}) {
  const step = 1;
  const initialValue = {
    page,
    perPage,
    query,
    gallery,
    total,
    totalHits,
    error: false,
    status: Status.IDLE,
  };

  const [state, dispatch] = useReducer(setReducer, initialValue);

  function handleMoreImage() {
    dispatch({ type: 'increment', payload: step });
  }

  const [_query, setQuery] = useState(query);
  const [_gallery, setGallery] = useState(gallery);
  const [_total, setTotal] = useState(total);
  const [_totalHits, setTotalHits] = useState(totalHits);
  const [_perPage] = useState(perPage);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setQuery(query);
    setGallery(gallery);
    setTotal(total);
    setTotalHits(totalHits);
  }, [gallery, query, total, totalHits]);

  useEffect(() => {
    if (!_query) {
      return;
    }
    setStatus(Status.PENDING);
    async function fetchAssets() {
      try {
        const { totalHits, hits } = await API.getGallery(
          _query,
          state.page,
          _perPage
        );
        setGallery(prevState => [...prevState, ...hits]);
        // dispatch({ type: 'gallery', payload: hits });
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
  }, [_perPage, _query, state.page]);

  useEffect(() => {
    if (!_totalHits) {
      return;
    }
    setTotalPages(Math.ceil(_totalHits / _perPage));
    if (totalPages > state.page) {
      setLoadMore(true);
    }
    if (state.page === totalPages) {
      toast.warn("We're sorry, but you've reached the end of search results.");
      setLoadMore(false);
    }
  }, [_perPage, _totalHits, state.page, totalPages]);

  useEffect(() => {
    if (!_query) {
      return;
    }
    if (_total === 0) {
      toast.error(
        `Sorry, there are no images matching your search query for '${_query}'. Please try again.`
      );
      setStatus(Status.IDLE);
    }
  }, [_query, _total]);

  useEffect(() => {
    if (!_totalHits) {
      return;
    }
    toast.success(`Hooray! We found ${_totalHits} images.`);
  }, [_totalHits]);

  if (status === Status.IDLE) {
    return <div>Please let us know your query item</div>;
  }
  if (status === Status.PENDING) {
    return <ImageGalleryPending query={_query} data={_gallery} />;
  }
  if (status === Status.REJECTED) {
    return <ImageGalleryError message={error.message} />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery data={_gallery} />;
        {loadMore && (
          <Box display="flex" justifyContent="center">
            <Button type="button" onClick={handleMoreImage}>
              Load more
            </Button>
          </Box>
        )}
      </>
    );
  }
}

ImageGalleryHub.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string,
  gallery: PropTypes.array,
  total: PropTypes.number,
  totalHits: PropTypes.number,
};
