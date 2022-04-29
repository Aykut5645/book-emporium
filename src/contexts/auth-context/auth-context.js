import { useState } from "react";

import AuthContext from "./AuthProvider";

const AuthProvider = props => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const isLoggedIn = Boolean(token);

    const loginHandler = token => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    const authContext = {
        token,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;