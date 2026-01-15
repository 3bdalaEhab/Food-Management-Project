import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon,
  fullWidth = true,
  className = '',
  ...props
}, ref) => {
  const inputStyle = {
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <div className={`flex-column ${className}`} style={inputStyle}>
      {label && (
        <label className="form-label mb-2 fw-semibold" style={{ color: '#000' }}>
          {label}
        </label>
      )}
      <div className="input-group has-validation">
        {icon && (
          <span className="input-group-text rounded-end-0 bg-light">
            <i className={`icon ${icon}`}></i>
          </span>
        )}
        <input
          ref={ref}
          className={`form-control bg-light ${icon ? '' : 'rounded'} ${error ? 'is-invalid' : ''}`}
          style={{
            borderEnd: icon ? 'none' : undefined,
            borderRadius: icon ? '0 12px 12px 0' : '12px',
          }}
          {...props}
        />
      </div>
      {error && (
        <div className="mt-1 py-1 alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
