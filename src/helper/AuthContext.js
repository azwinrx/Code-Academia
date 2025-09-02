import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser, getSession, signOutUser } from "./supabaseAuth";
import supabase from "./supabaseClient";

// Create the auth context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize: Check for existing session
    const initAuth = async () => {
      try {
        const { session: currentSession } = await getSession();
        setSession(currentSession);

        if (currentSession) {
          const { user: currentUser } = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);

        if (session) {
          const { user: currentUser } = await getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Sign out function
  const logout = async () => {
    await signOutUser();
    setUser(null);
    setSession(null);
  };

  // Values to be provided to consumers
  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
