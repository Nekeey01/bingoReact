import {Box, Typography} from "@mui/material";

export default function BingoView() {
    return (
        <Box sx={{
            padding: 'var(--main-padding)',
        }}>
            <Typography sx={{
                color: "var(--contentColorLight)",
                fontSize: "var(--pageSubHeaderTextSize)",
                textTransform: "uppercase",
                fontWeight: "700",
            }}>
                Аккаунт
            </Typography>
            <Typography sx={{
                color: "white",
                fontSize: "var(--pageHeaderTextSize)",
                textTransform: "capitalize",
                paddingTop: "12px",
                fontWeight: "700",
            }}>
                Создай свое бинго
            </Typography>
        </Box>
    );
}