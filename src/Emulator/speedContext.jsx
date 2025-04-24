import { createContext, useContext, useState } from "react";

const SpeedContext = createContext();

export const useSpeed = () => useContext(SpeedContext);

export const SpeedProvider = ({ children }) => {
  const [speed, setSpeed] = useState(1);

  return (
    <SpeedContext.Provider value={{ speed, setSpeed }}>
      {children}
    </SpeedContext.Provider>
  );
};
