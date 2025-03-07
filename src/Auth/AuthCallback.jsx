import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";

function AuthCallback() {
    const navigate = useNavigate();
    const { login } = useAuth();


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("access_token");

        if (token) {
            // localStorage.setItem("access_token", token);
            login(token)
            window.history.replaceState({}, document.title, "/"); // Очищаем URL
            navigate("/"); // Возвращаем пользователя на главную страницу
        }
    }, [navigate]);

    return <p>Авторизация...</p>;
}

export default AuthCallback;