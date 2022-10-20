import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: ${props => `${props.theme.colors.white}`};
  border-radius: ${props => `${props.theme.radii.searchForm}px`};
  overflow: hidden;
`;

export const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: ${props => `${props.theme.sizes[5]}px`};
  border: ${props => `${props.theme.borders.none}`};
  outline: none;
  padding-left: ${props => `${props.theme.space[1]}px`};
  padding-right: ${props => `${props.theme.space[1]}px`};
  &::placeholder {
    font: inherit;
    font-size: ${props => `${props.theme.fontSizes.s}px`};
  }
`;

export const Error = styled(ErrorMessage)`
  color: ${props => props.theme.colors.red};
  margin-bottom: ${props => `${props.theme.space[2]}px`};
`;

export const SearchFormButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  /* background-image: url('https://image.flaticon.com/icons/svg/149/149852.svg'); */
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;

export const SearchFormButtonLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;
