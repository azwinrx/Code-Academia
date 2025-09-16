import { createContext, useContext } from "react";

// Buat dan ekspor context agar bisa diimpor oleh Provider
export const AuthContext = createContext(null);

// Buat dan ekspor custom hook untuk menggunakan context
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};