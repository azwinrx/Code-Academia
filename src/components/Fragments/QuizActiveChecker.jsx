import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../helper/authUtils';
import { hasActiveQuiz, getActiveQuizInfo } from '../../helper/quizPersistence';
import { showToast } from '../../helper/toastUtil';

const QuizActiveChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    // Only check if user is loaded and authenticated
    if (loading || !user) return;

    const currentPath = location.pathname;
    
    // Don't redirect if already on quiz page
    if (currentPath.includes('/quiz/')) return;
    
    // Check if user has active quiz
    if (hasActiveQuiz(user.id)) {
      const activeQuiz = getActiveQuizInfo(user.id);
      
      if (activeQuiz) {
        const minutes = Math.floor(activeQuiz.remainingTime / 60);
        const seconds = activeQuiz.remainingTime % 60;
        
        showToast(
          `Anda memiliki quiz yang sedang berlangsung. Sisa waktu: ${minutes}:${seconds.toString().padStart(2, '0')}`,
          'warning'
        );
        
        // Redirect to active quiz after short delay
        setTimeout(() => {
          navigate(`/quiz/${activeQuiz.slug}`, { replace: true });
        }, 2000);
        
        return;
      }
    }
  }, [user, loading, location.pathname, navigate]);

  return children;
};

export default QuizActiveChecker;