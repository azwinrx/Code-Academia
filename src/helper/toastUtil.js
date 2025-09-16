// Simple utility for displaying toast notifications
// You can replace this with a more robust library like react-toastify or react-hot-toast

let toastContainer = null;

// Initialize toast container
export const initToasts = () => {
  if (document.getElementById("toast-container")) return;

  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  toastContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  document.body.appendChild(toastContainer);
};

// Show a toast notification
export const showToast = (message, type = "info", duration = 4000) => {
  if (!toastContainer) initToasts();

  const toast = document.createElement("div");
  toast.style.cssText = `
    padding: 12px 20px;
    border-radius: 4px;
    min-width: 240px;
    animation: slide-in 0.3s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  // Set styles based on toast type
  switch (type) {
    case "success":
      toast.style.backgroundColor = "#4CAF50";
      toast.style.color = "white";
      break;
    case "error":
      toast.style.backgroundColor = "#F44336";
      toast.style.color = "white";
      break;
    case "warning":
      toast.style.backgroundColor = "#FF9800";
      toast.style.color = "white";
      break;
    default:
      toast.style.backgroundColor = "#669DBD";
      toast.style.color = "white";
  }

  // Add message and close button
  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    margin-left: 10px;
  `;

  // Add click handler to close button
  closeButton.addEventListener("click", () => {
    removeToast(toast);
  });

  toast.appendChild(messageSpan);
  toast.appendChild(closeButton);

  toastContainer.appendChild(toast);

  // Automatically remove after duration
  setTimeout(() => {
    removeToast(toast);
  }, duration);

  return toast;
};

// Remove a toast from the container
const removeToast = (toast) => {
  toast.style.animation = "slide-out 0.3s ease-out forwards";

  // Remove the toast element after animation completes
  setTimeout(() => {
    if (toastContainer && toastContainer.contains(toast)) {
      toastContainer.removeChild(toast);
    }
  }, 300);
};

// Add animations to the document
const addAnimations = () => {
  if (document.getElementById("toast-animations")) return;

  const style = document.createElement("style");
  style.id = "toast-animations";
  style.innerHTML = `
    @keyframes slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slide-out {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;

  document.head.appendChild(style);
};

// Initialize animations when this module is imported
addAnimations();
