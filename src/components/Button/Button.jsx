import { StyledButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({
  icon: Icon = null,
  type = 'button',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick}>
      {Icon && <Icon size="16" />}
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
