import toast from 'react-hot-toast';

const defaultStyle = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)',
  color: '#fff',
  border: '1px solid rgba(0, 212, 255, 0.2)',
  borderRadius: '8px',
  padding: '12px 16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
};

const defaultOptions = {
  duration: 4000,
  position: 'top-right',
  style: defaultStyle,
};

export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    ...defaultOptions,
    ...options,
    icon: '✅',
    style: {
      ...defaultStyle,
      borderColor: 'rgba(0, 255, 100, 0.3)',
    },
  });
};

export const showError = (message, options = {}) => {
  return toast.error(message, {
    ...defaultOptions,
    duration: 5000,
    ...options,
    icon: '❌',
    style: {
      ...defaultStyle,
      borderColor: 'rgba(255, 107, 107, 0.3)',
    },
  });
};

export const showInfo = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    ...options,
    icon: 'ℹ️',
    style: {
      ...defaultStyle,
      borderColor: 'rgba(0, 212, 255, 0.3)',
    },
  });
};

export const showWarning = (message, options = {}) => {
  return toast(message, {
    ...defaultOptions,
    ...options,
    icon: '⚠️',
    style: {
      ...defaultStyle,
      borderColor: 'rgba(255, 193, 7, 0.3)',
    },
  });
};

export const showLoading = (message = 'Carregando...') => {
  return toast.loading(message, {
    ...defaultOptions,
    duration: Infinity,
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export const dismissAllToasts = () => {
  toast.dismiss();
};

export const showPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Processando...',
      success: messages.success || 'Concluído!',
      error: messages.error || 'Ocorreu um erro',
    },
    {
      ...defaultOptions,
      ...options,
      style: defaultStyle,
    }
  );
};

export const showCustom = (content, options = {}) => {
  return toast.custom(content, {
    ...defaultOptions,
    ...options,
  });
};

export const updateToast = (toastId, message, type = 'success') => {
  dismissToast(toastId);
  
  switch (type) {
    case 'success':
      return showSuccess(message);
    case 'error':
      return showError(message);
    case 'warning':
      return showWarning(message);
    default:
      return showInfo(message);
  }
};

export const toastConfig = {
  toasterProps: {
    position: 'top-right',
    reverseOrder: false,
    gutter: 8,
    containerStyle: {
      top: 80,
    },
    toastOptions: {
      duration: 4000,
      style: defaultStyle,
    },
  },
};

export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
  loading: showLoading,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
  promise: showPromise,
  custom: showCustom,
  update: updateToast,
};
