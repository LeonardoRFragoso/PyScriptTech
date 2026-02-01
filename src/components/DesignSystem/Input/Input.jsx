import React, { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Input.module.css';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  variant = 'default',
  size = 'medium',
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const containerClasses = [
    styles.container,
    fullWidth ? styles.fullWidth : '',
    containerClassName,
  ].filter(Boolean).join(' ');

  const inputWrapperClasses = [
    styles.inputWrapper,
    styles[variant],
    styles[size],
    isFocused ? styles.focused : '',
    error ? styles.hasError : '',
    disabled ? styles.disabled : '',
    icon && iconPosition === 'left' ? styles.hasIconLeft : '',
    icon && iconPosition === 'right' ? styles.hasIconRight : '',
    isPassword ? styles.hasIconRight : '',
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.input,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={inputWrapperClasses}>
        {icon && iconPosition === 'left' && (
          <span className={`${styles.icon} ${styles.iconLeft}`}>
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          type={inputType}
          className={inputClasses}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {icon && iconPosition === 'right' && !isPassword && (
          <span className={`${styles.icon} ${styles.iconRight}`}>
            {icon}
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <span className={`${styles.helper} ${error ? styles.errorText : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
