import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Box } from 'components/Box';

export const ImageGallery = ({ data, ...otherProps }) => {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap={4} pb={5}>
      <ImageGalleryList>
        {data.map(item => (
          <ImageGalleryItem key={item.id} item={item} {...otherProps} />
        ))}
      </ImageGalleryList>
    </Box>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.array,
};
