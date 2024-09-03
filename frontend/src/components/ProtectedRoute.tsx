// import React from 'react'
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token=")); 

    const token = cookie ? cookie.split("=")[1] : null; 

    if (!token) {
        return <Navigate to={'/signin'} />;
    }
    else {
        return children; 
    }

}

export default ProtectedRoute