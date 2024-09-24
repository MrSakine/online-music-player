import React, { createContext } from "react";
import AxiosService from "./services/AxiosService";

const AxiosContext = createContext<AxiosService | undefined>(undefined);

const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const axiosService = new AxiosService();

  return (
    <AxiosContext.Provider value={axiosService}>
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
