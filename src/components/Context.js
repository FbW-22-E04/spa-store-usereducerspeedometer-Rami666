import { createContext, useState } from "react";

export const Context = createContext();


const CarContextProvider = ({children}) => {

const [counter, setCounter] = useState(0);

    return <Context.Provider value={{counter, setCounter}}>
        {children}
        </Context.Provider>;
    };
export default CarContextProvider;