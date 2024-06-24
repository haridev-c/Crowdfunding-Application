import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

function GlobalStateRepository({ children }) {
  const [user, setUser] = useState(null);
  const [renderGSR, setRenderGSR] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/user/profile");
      setUser(data);
    } catch (error) {
      console.log("Error from fetchUserData of GSR", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [renderGSR]);

  if (isLoading) {
    return null;
  }

  return (
    <GlobalContext.Provider value={{ user, setRenderGSR, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalStateRepository;
