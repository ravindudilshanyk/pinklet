import '../ui.css';

function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }) {
  const variantClass = {
    primary: 'btnPrimary',
    secondary: 'btnSecondary',
    outline: 'btnOutline',
  };

  return (
    <button
      type={type}
      className={`btn ${variantClass[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
