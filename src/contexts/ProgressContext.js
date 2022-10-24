import { createContext, useContext, useState } from "react";

export const ProgressContext = createContext()

export const ProgressProvider = ({ children }) => {

   const [progress, setProgress] = useState(0)

   return (
    <ProgressContext.Provider value={{progress, setProgress}}>
        {children}
    </ProgressContext.Provider>
   )
}

export const useProgress = () => useContext(ProgressContext);