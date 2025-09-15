import { useCallback } from 'react';
import { showToast } from '../helper/toastUtil';

export const useToast = () => {
  const success = useCallback((message) => {
    showToast(message, 'success');
  }, []);

  const error = useCallback((message) => {
    showToast(message, 'error');
  }, []);

  const warning = useCallback((message) => {
    showToast(message, 'warning');
  }, []);

  const info = useCallback((message) => {
    showToast(message, 'info');
  }, []);

  return {
    success,
    error,
    warning,
    info
  };
};