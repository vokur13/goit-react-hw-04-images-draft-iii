import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box } from 'components/Box';
import { SearchForm, Input, SearchFormButton } from './Searchbar.styled';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ImSearch } from 'react-icons/im';

const schema = yup.object().shape({
  query: yup.string(),
});

export function Searchbar({ onFormSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    onFormSubmit(data);
  };

  console.log(watch('query'));

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ query: '' });
    }
  }, [isSubmitSuccessful, reset]);

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
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchFormButton type="submit">
          <ImSearch style={{ marginRight: 0 }} />
        </SearchFormButton>
        <Input
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
          defaultValue=""
          {...register('query')}
        />
        <p>{errors.query?.message}</p>
      </SearchForm>
    </Box>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
