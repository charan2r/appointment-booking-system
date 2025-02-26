import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
    const token = localStorage.getItem('authToken');
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default Auth;
