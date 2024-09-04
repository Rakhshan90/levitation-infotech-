import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { backendURL } from "@/lib/backendURL";
import axios from "axios";

const Appbar = () => {

    // Function to handle sign out
    const clickHandler = async () => {
        try {
            await axios.post(`${backendURL}/api/user/signout`, {}, { withCredentials: true });
        } catch (error: any) {
            console.log(error);
        }
    };



    return (
        <div className="p-4 shadow max-w-screen">
            <div className="w-full flex justify-between items-center">
                <Link to={'/'} className="font-bold text-xl">Levitation</Link>

                <div className="flex gap-4 items-center">
                    <Link className="font-semibold hover:text-blue-600" to={'/my-forms'}>My forms</Link>
                    <Button onClick={clickHandler} className="bg-red-600">Logout</Button>
                    <Link className="font-semibold hover:text-blue-600" to={'/signin'}>Sign In</Link>
                    <Link className="font-semibold hover:text-blue-600" to={'/signup'}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Appbar