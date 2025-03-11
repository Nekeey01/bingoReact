import axios from "axios";
import { useNavigate } from "react-router-dom";
import  { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { Close, Google, Facebook, GitHub } from "@mui/icons-material";
import OAuthProviders from "./OAuthProviders.jsx";
import {useAuth} from "./AuthContext.jsx";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    // const email = "", password = "";
    // const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(`email - ${email}`);
        console.log(`password - ${password}`);
        // setError("");

        try {
            const response = await axios.post("http://localhost:8000/register", {
                email,
                password,
            });

            if (response.status === 200) {
                alert("Регистрация успешна! Теперь войдите в аккаунт.");
                const response = await axios.post("http://localhost:8000/login", {
                    email,
                    password,
                });
                console.log(`access token - ${response.data.access_token}`)
                login(response.data.access_token);
                // navigate("/login"); // Перенаправление на страницу входа
                navigate("/"); // Перенаправление на страницу входа
            }
            else{
                alert("ABOBA NOT WORK");
            }
        } catch (err) {
            // setError(err.response?.data?.detail || "Ошибка регистрации");
            console.log(`Ошибка регистрации - ${err}`);
        }
    };



    return (
            <Box>

                <Typography variant="h5" sx={{ mb: 2, color: "red", textAlign: "center" }}>
                    Зарегистрироваться
                </Typography>

                <OAuthProviders></OAuthProviders>

                <Typography variant="h6" sx={{ textAlign: "center", mb: 2, mt:6 }}>
                    или используйте email
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        margin="normal"
                        // type="email"
                        InputLabelProps={{ style: { color: "#ffffff" } }}
                        InputProps={{ style: { color: "#ffffff" } }}
                        sx={{ bgcolor: "#333", borderRadius: 1 }}
                        {...register("email", {
                            required: "Введи почту дура",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Неверный формат email, лох",
                            },
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label="Пароль"
                        margin="normal"
                        type="password"
                        InputLabelProps={{ style: { color: "#ffffff" } }}
                        InputProps={{ style: { color: "#ffffff" } }}
                        sx={{ bgcolor: "#333", borderRadius: 1 }}
                        {...register("password", {
                            required: "Введи пароль чмоня",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть не менее 6 символов, лох",
                            },
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, bgcolor: "#6200ea", color: "white" }}
                    >
                        Войти
                    </Button>
                </form>
            </Box>
    );
    //     <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
    //         <h2>Регистрация</h2>
    //         <form onSubmit={handleRegister}>
    //             <input
    //                 type="email"
    //                 placeholder="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //             />
    //             <br />
    //             <input
    //                 type="password"
    //                 placeholder="Пароль"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //             />
    //             <br />
    //             <button type="submit">Зарегистрироваться</button>
    //         </form>
    //         {error && <p style={{ color: "red" }}>{error}</p>}
    //     </div>
    // );
}
