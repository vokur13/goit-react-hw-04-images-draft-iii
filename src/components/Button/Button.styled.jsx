import styled from 'styled-components';

export const StyledButton = styled.button`
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  font-size: ${props => props.theme.fontSizes.s};
  line-height: ${props => props.theme.lineHeights.button};
  font-style: normal;
  font-weight: ${props => props.theme.fontWeights.button};
  min-width: 180px;
  padding-top: ${props => props.theme.space[2]}px;
  padding-bottom: ${props => props.theme.space[2]}px;
  padding-left: ${props => props.theme.space[4]}px;
  padding-right: ${props => props.theme.space[4]}px;
  border: ${props => props.theme.borders.zero};
  border-radius: ${props => props.theme.radii.normal};
  background-color: ${props =>
    props.disabled ? props.theme.colors.muted : props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.accent};
  }
  box-shadow: ${props => props.theme.shadows.button};
`;
