import React, { useState } from "react";
import { SearchContext } from "./searchContext.js";

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        updateSearchTerm,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
