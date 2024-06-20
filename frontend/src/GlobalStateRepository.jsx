import React, { createContext } from "react";

export const GlobalContext = createContext();

function GlobalStateRepository({ children }) {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
}

export default GlobalStateRepository;
