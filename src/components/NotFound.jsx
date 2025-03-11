import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box sx={{textAlign: "center", mt: 10}}>
            <Typography variant="h2" color="error">
                404
            </Typography>
            <Typography variant="h5" sx={{mb: 3}}>
                Страница не найдена
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
                На главную
            </Button>
        </Box>
    );
}