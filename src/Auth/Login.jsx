import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Close, Facebook, GitHub, Google} from "@mui/icons-material";
import {useForm} from "react-hook-form";

// Создание темы

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [remember, setRemember] = useState("false");
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(`login email - ${email}`);
        console.log(`login password - ${password}`);

        try {
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });
            console.log(`access token - ${response.data.access_token}`)
            login(response.data.access_token);
            navigate("/"); // После логина отправляем на главную
        } catch (error) {
            console.error("Ошибка входа:", error);
            alert("Неверные данные!");
        }
    };

    const handleOAuthLogin = async (provider) => {
        const { data } = await axios.get("http://localhost:8000/gLogin");
        window.location.href = data.auth_url;
    };

    return (
        <Box>

            <Typography variant="h5" sx={{ mb: 2,  color: "green",  textAlign: "center" }}>
                Войти
            </Typography>
            <Button
                fullWidth
                variant="contained"
                startIcon={<Google />}
                sx={{ mb: 1, bgcolor: "#4285F4", color: "white" }}
                onClick={() => handleOAuthLogin("Google")}
            >
                Войти через Google
            </Button>
            <Button
                fullWidth
                variant="contained"
                startIcon={<Facebook />}
                sx={{ mb: 1, bgcolor: "#1877F2", color: "white" }}
            >
                Войти через Facebook
            </Button>
            <Button
                fullWidth
                variant="contained"
                startIcon={<GitHub />}
                sx={{ mb: 2, bgcolor: "#333", color: "white" }}
            >
                Войти через GitHub
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
                или используйте email
            </Typography>
            <form onSubmit={handleLogin}>
                {/*<TextField*/}
                {/*    required*/}
                {/*    fullWidth*/}
                {/*    id="email"*/}
                {/*    label="Email"*/}
                {/*    margin="normal"*/}
                {/*    // type="email"*/}
                {/*    InputLabelProps={{ style: { color: "#ffffff" } }}*/}
                {/*    InputProps={{ style: { color: "#ffffff" } }}*/}
                {/*    sx={{ bgcolor: "#333", borderRadius: 1 }}*/}

                {/*/>*/}
                {/*<TextField*/}
                {/*    required*/}
                {/*    fullWidth*/}
                {/*    id="password"*/}
                {/*    label="Пароль"*/}
                {/*    margin="normal"*/}
                {/*    type="password"*/}
                {/*    InputLabelProps={{ style: { color: "#ffffff" } }}*/}
                {/*    InputProps={{ style: { color: "#ffffff" } }}*/}
                {/*    sx={{ bgcolor: "#333", borderRadius: 1 }}*/}

                {/*/>*/}
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

                    onChange={(e) => setEmail(e.target.value)}
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

                    onChange={(e) => setPassword(e.target.value)}
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
            // <Container >
            //     <CssBaseline />
            //     <Box
            //         sx={{
            //             marginTop: 8,
            //             display: 'flex',
            //             flexDirection: 'column',
            //             alignItems: 'center',
            //         }}
            //     >
            //         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            //             <LockOutlinedIcon />
            //         </Avatar>
            //         <Typography component="h1" variant="h5">
            //             Войти
            //         </Typography>
            //         <Box component="form" noValidate sx={{ mt: 1 }}>
            //             <TextField
            //                 margin="normal"
            //                 required
            //                 fullWidth
            //                 id="email"
            //                 label="email"
            //                 name="email"
            //                 autoComplete="email"
            //                 value={email}
            //                 onChange={(e) => setemail(e.target.value)}
            //                 autoFocus
            //             />
            //             <TextField
            //                 margin="normal"
            //                 required
            //                 fullWidth
            //                 name="password"
            //                 label="Password"
            //                 type="password"
            //                 id="password"
            //                 autoComplete="current-password"
            //                 value={password}
            //                 onChange={(e) => setPassword(e.target.value)}
            //             />
            //             <FormControlLabel
            //                 control={<Checkbox value={remember} onChange={() => remember = !remember} color="primary" />}
            //                 label="Запомнить меня"
            //             />
            //             <Button
            //                 onClick={handleLogin}
            //                 fullWidth
            //                 variant="contained"
            //                 sx={{ mt: 3, mb: 2 }}
            //             >
            //                 Войти
            //             </Button>
            //             <Grid container>
            //                 <Grid item xs>
            //                     <Link href="#" variant="body2">
            //                         Забыли пароль?
            //                     </Link>
            //                 </Grid>
            //                 <Grid item>
            //                     <Link href="#" variant="body2">
            //                         Зарегайся, клоуняра
            //                     </Link>
            //                 </Grid>
            //             </Grid>
            //         </Box>
            //     </Box>
            //     <Copyright sx={{ mt: 8, mb: 4 }} />
            // </Container>
    );

}
