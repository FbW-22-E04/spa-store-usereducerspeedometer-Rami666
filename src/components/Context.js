import { createContext } from "react";

export const Context = createContext();


const CarContextProvider = ({children}) => {
    return <Context.Provider>
        {children}
        </Context.Provider>;
    };
export default CarContextProvider;