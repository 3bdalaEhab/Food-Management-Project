const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease-in-out',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : 'rgba(74, 163, 90, 1)',
      color: '#ffffff',
      '&:hover': !disabled && !isLoading ? {
        backgroundColor: 'rgba(74, 163, 90, 0.9)',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px rgba(74, 163, 90, 0.3)',
      } : {},
    },
    secondary: {
      backgroundColor: disabled ? '#e0e0e0' : 'transparent',
      color: disabled ? '#999' : 'rgba(74, 163, 90, 1)',
      border: `2px solid ${disabled ? '#ccc' : 'rgba(74, 163, 90, 1)'}`,
      '&:hover': !disabled && !isLoading ? {
        backgroundColor: 'rgba(74, 163, 90, 0.1)',
      } : {},
    },
    danger: {
      backgroundColor: disabled ? '#ccc' : 'transparent',
      color: disabled ? '#999' : 'rgb(197, 15, 15)',
      border: `1px solid ${disabled ? '#ccc' : 'rgb(197, 15, 15)'}`,
      '&:hover': !disabled && !isLoading ? {
        backgroundColor: 'rgba(197, 15, 15, 0.1)',
      } : {},
    },
  };

  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: '0.875rem',
    },
    md: {
      padding: '12px 24px',
      fontSize: '1rem',
    },
    lg: {
      padding: '16px 32px',
      fontSize: '1.125rem',
    },
  };

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || isLoading ? 0.6 : 1,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={className}
      style={buttonStyle}
      {...props}
    >
      {isLoading ? (
        <>
          <i className="fa-solid fa-spinner fa-spin"></i>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
