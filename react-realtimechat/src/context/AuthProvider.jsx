import { createContext, useState } from "react";

const AuthContext = createContext({
    isAuth: false,
    token: '',
    user: {
        id: '',
        username: '',
        roles: ''
    }

});
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuth: false,
        token: '',
        user: {
            id: '',
            username: '',
            roles: ''
        },
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;