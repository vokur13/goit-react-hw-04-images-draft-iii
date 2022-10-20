import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
// import { ReactComponent as MyIcon } from './.svg';
import { Formik } from 'formik';
import { Box } from 'components/Box';
import { SearchForm, Input, SearchFormButton, Error } from './Searchbar.styled';
import * as yup from 'yup';
import { ImSearch } from 'react-icons/im';

let schema = yup.object().shape({
  query: yup.string(),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    onSubmit(values);
    setSubmitting(false);
    resetForm();
  };
  return (
    <Box
      top={0}
      left={0}
      position="sticky"
      zIndex="appBar"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={7}
      px={5}
      py={3}
      color="white"
      bg="accent"
      boxShadow="appBar"
      as="header"
    >
      <Formik
        initialValues={{ query: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <SearchForm>
            <SearchFormButton type="submit" disabled={isSubmitting}>
              <ImSearch style={{ marginRight: 0 }} />
            </SearchFormButton>

            <Input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              name="query"
              //       required
              placeholder="Search images and photos"
            />
            <Error component="div" name="query" />
          </SearchForm>
        )}
      </Formik>
    </Box>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
