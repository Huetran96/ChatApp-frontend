import { createContext, useState } from "react";


const HideContext = createContext();

export const HideProvider = ({ children }) => {
    const [hideOverlay, setHideOverLay] = useState(true)


    return (
        <HideContext.Provider value={{ hideOverlay, setHideOverLay }} >
            {children}
        </HideContext.Provider>
    )
}

export default HideContext;