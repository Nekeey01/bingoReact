import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";
import {useEffect} from "react";


export default function Logout() {
    const {token, logout} = useAuth();
    useEffect(() => {
        logout();
    }, [])

    return(
        <Navigate to={"/"}></Navigate>
    )

}