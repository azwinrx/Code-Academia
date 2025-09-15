import supabase from "./supabaseClient";

// Get quiz by sub_materi_id
export async function getQuizBySubMateriId(subMateriId) {
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("sub_materi_id", subMateriId)
    .single();

  if (error) {
    console.error("Gagal mengambil quiz:", error);
    return null;
  }

  return data;
}

// Get all questions for a specific quiz with their options
export async function getQuizQuestions(quizId) {
  const { data, error } = await supabase
    .from("quiz_questions")
    .select(
      `
      id,
      teks_pertanyaan,
      urutan,
      quiz_options (
        id,
        teks_pilihan,
        is_correct,
        rationale
      )
    `
    )
    .eq("quiz_id", quizId)
    .order("urutan", { ascending: true });

  if (error) {
    console.error("Gagal mengambil pertanyaan quiz:", error);
    return [];
  }

  return data;
}

// Get quiz with all questions and options
export async function getCompleteQuiz(subMateriId) {
  try {
    // Get quiz
    const quiz = await getQuizBySubMateriId(subMateriId);
    if (!quiz) {
      return null;
    }

    // Get questions with options
    const questions = await getQuizQuestions(quiz.id);

    return {
      ...quiz,
      questions,
    };
  } catch (error) {
    console.error("Gagal mengambil quiz lengkap:", error);
    return null;
  }
}

// Submit quiz answers and calculate score
export async function submitQuizAnswers(quizId, answers) {
  try {
    // Get correct answers
    const { data: questions, error: questionsError } = await supabase
      .from("quiz_questions")
      .select(
        `
        id,
        quiz_options (
          id,
          is_correct
        )
      `
      )
      .eq("quiz_id", quizId);

    if (questionsError) {
      throw questionsError;
    }

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const correctOption = question.quiz_options.find(
        (option) => option.is_correct
      );

      if (correctOption && userAnswer === correctOption.id) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save quiz result (optional - jika ada tabel quiz_results)
    // const { error: resultError } = await supabase
    //   .from("quiz_results")
    //   .insert({
    //     quiz_id: quizId,
    //     user_id: userId,
    //     score: score,
    //     correct_answers: correctAnswers,
    //     total_questions: totalQuestions,
    //     answers: answers,
    //     completed_at: new Date().toISOString()
    //   });

    // if (resultError) {
    //   throw resultError;
    // }

    return {
      score,
      correctAnswers,
      totalQuestions,
      passed: score >= 70, // Assuming 70% is passing grade
    };
  } catch (error) {
    console.error("Gagal submit jawaban quiz:", error);
    throw error;
  }
}

// Get quiz statistics for a user (optional)
export async function getUserQuizStats(userId, quizId) {
  const { data, error } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", userId)
    .eq("quiz_id", quizId)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil statistik quiz:", error);
    return [];
  }

  return data;
}

// Check if quiz exists for sub materi
export async function hasQuiz(subMateriId) {
  const { data, error } = await supabase
    .from("quiz")
    .select("id")
    .eq("sub_materi_id", subMateriId)
    .single();

  return !error && data;
}
