// import React from 'react'

import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { backendURL } from "@/lib/backendURL";
import axios from "axios";
import { useEffect, useState } from "react";

const Appbar = () => {

    const [token, setToken] = useState<string | null>(null);

    // Function to get the current token from cookies
    const getTokenFromCookies = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));
        return cookie ? cookie.split("=")[1] : null;
    };

    // Function to handle sign out
    const clickHandler = async () => {
        try {
            await axios.post(`${backendURL}/api/user/signout`, {}, { withCredentials: true });
            setToken(null); // Update token state after sign out
        } catch (error: any) {
            console.log(error);
        }
    };

    // Effect to update the token state when the component mounts
    useEffect(() => {
        setToken(getTokenFromCookies());
    }, []);

    // Effect to update the token state when the token changes
    useEffect(() => {
        // This effect runs whenever `token` changes (e.g., after sign out)
        setToken(getTokenFromCookies());
    }, [token]);


    return (
        <div className="p-4 shadow max-w-screen">
            <div className="w-full flex justify-between items-center">
                <Link to={'/'} className="font-bold text-xl">Levitation</Link>

                <div className="flex gap-4 items-center">
                    <Link className="font-semibold hover:text-blue-600" to={'/my-forms'}>My forms</Link>
                    {token ? (
                        <Button onClick={clickHandler} className="bg-red-600">Logout</Button>
                    ) : (
                        <>
                            <Link className="font-semibold hover:text-blue-600" to={'/signin'}>Sign In</Link>
                            <Link className="font-semibold hover:text-blue-600" to={'/signup'}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Appbar