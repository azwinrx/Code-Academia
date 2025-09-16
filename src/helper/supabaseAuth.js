import supabase from "./supabaseClient";

// Sign up with email and password
export const signUpUser = async (email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { data: null, error };
  }
};

// Sign in with email and password
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { data: null, error };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error signing out:", error.message);
    return { error };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password-confirm",
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return { data: null, error };
  }
};

// Update user data
export const updateUserData = async (userData) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: userData,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error updating user data:", error.message);
    return { data: null, error };
  }
};

// Update user password
export const updateUserPassword = async (password) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error updating password:", error.message);
    return { data: null, error };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error("Error getting current user:", error.message);
    return { user: null, error };
  }
};

// Get session
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    console.error("Error getting session:", error.message);
    return { session: null, error };
  }
};
