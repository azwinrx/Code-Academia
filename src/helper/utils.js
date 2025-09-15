// Debounce utility function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format timestamp to relative time
export function formatTimestamp(timestamp) {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffMs = now - postDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return postDate.toLocaleDateString();
  }
}

// Generate avatar color based on name
export function getAvatarColor(name) {
  const colors = ['#77B1E3', '#A9A6E5', '#F1AD8D', '#A2D1B0'];
  const charCode = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[charCode % colors.length];
}

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Highlight search terms in text
export function highlightText(text, searchTerm) {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 text-black">$1</mark>');
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Extract text content from HTML (for safe highlighting)
export function extractTextFromHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

// Format number with commas
export function formatNumber(number) {
  if (number === undefined || number === null) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Get search relevance score (simple implementation)
export function getRelevanceScore(text, searchTerm) {
  if (!searchTerm || !text) return 0;
  
  const lowerText = text.toLowerCase();
  const lowerSearch = searchTerm.toLowerCase();
  
  let score = 0;
  
  // Exact match bonus
  if (lowerText.includes(lowerSearch)) {
    score += 10;
  }
  
  // Word boundary matches
  const wordRegex = new RegExp(`\\b${escapeRegExp(lowerSearch)}`, 'gi');
  const wordMatches = (text.match(wordRegex) || []).length;
  score += wordMatches * 5;
  
  // Partial matches
  const partialMatches = (lowerText.match(new RegExp(escapeRegExp(lowerSearch), 'gi')) || []).length;
  score += partialMatches * 2;
  
  return score;
}