import toast from 'react-hot-toast';

// Simple utility for displaying toast notifications
// You can replace this with a more robust library like react-toastify or react-hot-toast

// Show a toast notification
export const showToast = (message, type = "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.custom(message);
      break;
    default:
      toast(message);
  }
};