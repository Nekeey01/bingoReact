import {useNavigate} from "react-router-dom";
import Register from "../Auth/Register.jsx";
import {Button} from "@mui/material";
import {useState} from "react";
import LoginModalCard from "../Auth/LoginModalCard.jsx";
import {useAuth} from "../Auth/AuthContext.jsx";

export default function Home2() {
    const navigate = useNavigate();
    const { token,  logout } = useAuth()
    console.log("token2 - ", token)
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setOpen(false);
    }
    return (
        <h2>ТУТ ЖИВЕТ ГОМОГЕЙ</h2>
    );
}
