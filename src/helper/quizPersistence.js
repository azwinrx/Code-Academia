// Utility functions untuk mengelola state quiz yang persistent
const QUIZ_STATE_KEY = 'ongoing_quiz_state';

/**
 * Quiz State Structure:
 * {
 *   userId: string,
 *   quizId: number,
 *   slug: string,
 *   startTime: number (timestamp),
 *   initialTimeLimit: number (seconds),
 *   answers: object,
 *   currentQuestionIndex: number,
 *   isActive: boolean
 * }
 */

// Save quiz state to localStorage
export const saveQuizState = (quizState) => {
  try {
    const stateWithTimestamp = {
      ...quizState,
      lastSaved: Date.now()
    };
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateWithTimestamp));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
};

// Get quiz state from localStorage
export const getQuizState = () => {
  try {
    const saved = localStorage.getItem(QUIZ_STATE_KEY);
    if (!saved) return null;
    
    const state = JSON.parse(saved);
    
    // Check if quiz has expired (30 minutes max session)
    const now = Date.now();
    const maxSessionTime = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    if (state.lastSaved && (now - state.lastSaved > maxSessionTime)) {
      clearQuizState();
      return null;
    }
    
    return state;
  } catch (error) {
    console.error('Failed to get quiz state:', error);
    return null;
  }
};

// Calculate remaining time based on start time and time limit
export const calculateRemainingTime = (startTime, initialTimeLimit) => {
  const now = Date.now();
  const elapsed = Math.floor((now - startTime) / 1000); // elapsed time in seconds
  const remaining = initialTimeLimit - elapsed;
  return Math.max(0, remaining); // Ensure it's not negative
};

// Check if there's an active quiz for a user
export const hasActiveQuiz = (userId) => {
  const state = getQuizState();
  if (!state || !state.isActive) return false;
  
  // Check if it's the same user
  if (state.userId !== userId) {
    clearQuizState();
    return false;
  }
  
  // Check if time hasn't run out
  const remainingTime = calculateRemainingTime(state.startTime, state.initialTimeLimit);
  if (remainingTime <= 0) {
    clearQuizState();
    return false;
  }
  
  return true;
};

// Get active quiz info
export const getActiveQuizInfo = (userId) => {
  const state = getQuizState();
  if (!hasActiveQuiz(userId)) return null;
  
  return {
    slug: state.slug,
    remainingTime: calculateRemainingTime(state.startTime, state.initialTimeLimit),
    quizId: state.quizId
  };
};

// Clear quiz state
export const clearQuizState = () => {
  try {
    localStorage.removeItem(QUIZ_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz state:', error);
  }
};

// Update quiz answers in localStorage
export const updateQuizAnswers = (userId, answers, currentQuestionIndex = null) => {
  const state = getQuizState();
  if (!state || state.userId !== userId) return;
  
  const updatedState = {
    ...state,
    answers,
    lastSaved: Date.now()
  };
  
  if (currentQuestionIndex !== null) {
    updatedState.currentQuestionIndex = currentQuestionIndex;
  }
  
  saveQuizState(updatedState);
};

// Mark quiz as completed
export const markQuizCompleted = () => {
  clearQuizState();
};