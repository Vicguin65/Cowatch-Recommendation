import React, { createContext, useState } from "react";

// Create the context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [sub, setSub] = useState(null);

  return (
    <GlobalStateContext.Provider value={{ sub, setSub }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
