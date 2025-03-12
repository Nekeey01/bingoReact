import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { Menu as MenuIcon, Login as LoginIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext.jsx";
import { useProfile } from "../ProfileContext.jsx";
import LoginModalCard from "../../Auth/LoginModalCard.jsx";

const navItems = [
    { label: "Генератор (Axios)", path: "/axios" },
    { label: "Генератор (WebSocket)", path: "/websocket" },
    { label: "Комментарии", path: "/comments" },
];

const settingsItems = [
    { label: "Профиль", action: "#" },
    { label: "Аватар из Яндекса", action: "Yandex" },
    { label: "Аватар из Google", action: "Google" },
    { label: "Сбросить аватар", action: "Empty" },
    { label: "Выйти", action: "logout" },
];

function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null); // Меню настроек
    const [drawerOpen, setDrawerOpen] = useState(false); // Боковая панель для мобильных
    const [modalOpen, setModalOpen] = useState(false); // Модальное окно логина
    const navigate = useNavigate();
    const { token, logout } = useAuth();
    const { userAvatarLink, setAvatarByOAuth, setAvatar } = useProfile();

    // Открытие/закрытие меню настроек
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    // Открытие/закрытие боковой панели
    const toggleDrawer = (open) => () => setDrawerOpen(open);

    // Навигация по пунктам меню
    const handleNavClick = (path) => {
        navigate(path);
        setDrawerOpen(false); // Закрываем панель на мобильных
    };

    // Обработка действий в меню настроек
    const handleSettingClick = (action) => {
        switch (action) {
            case "logout":
                logout();
                navigate("/");
                break;
            case "Yandex":
            case "Google":
                setAvatarByOAuth(action);
                break;
            case "Empty":
                setAvatar(null);
                break;
            default:
                break;
        }
        handleCloseUserMenu();
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: "var(--backgroundLight)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Toolbar sx={{
                justifyContent: "space-between",
                paddingX: 'var(--main-padding) !important'
            }}>
                {/* Логотип/Название */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: "var(--primaryColor)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        transition: "var(--contentTransition)",
                        "&:hover": { color: "var(--contentColorMain)" },
                    }}
                    onClick={() => navigate("/")}
                >
                    <Box>We Love Bingo</Box>
                    <Box sx={{color: "white", paddingX: "10px"}}>|</Box>
                    <Box sx={{color: "white", fontSize: "12px"}}>by YA</Box>
                </Typography>

                {/* Элементы для авторизованного пользователя */}
                {token ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Навигация для десктопов */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    onClick={() => handleNavClick(item.path)}
                                    sx={{
                                        color: "#fff",
                                        mx: 1,
                                        textTransform: "none",
                                        fontWeight: 500,
                                        "&:hover": {
                                            bgcolor: "rgba(255, 255, 255, 0.1)",
                                            borderRadius: 1,
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Аватар и меню настроек */}
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                src={userAvatarLink}
                                alt="User Avatar"
                                sx={{
                                    width: 36,
                                    height: 36,
                                    border: "2px solid #fff",
                                    "&:hover": { borderColor: "#e0e0e0" },
                                }}
                            />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            PaperProps={{
                                sx: {
                                    bgcolor: "#1a1a1a",
                                    color: "#fff",
                                    mt: 1,
                                    borderRadius: 2,
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                                },
                            }}
                        >
                            {settingsItems.map((item) => (
                                <MenuItem
                                    key={item.label}
                                    onClick={() => handleSettingClick(item.action)}
                                    sx={{
                                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                                    }}
                                >
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Menu>


                    </Box>
                ) : (
                    /* Кнопка "Войти" для неавторизованных */
                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        onClick={() => setModalOpen(true)}
                        sx={{
                            bgcolor: "var(--contentColorMain)",
                            color: "black",
                            transition: "var(--contentTransition)",
                            textTransform: "none",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            "&:hover": {
                                bgcolor: "var(--contentColorDark)",
                                color: "white",
                            },
                        }}
                    >
                        Войти
                    </Button>
                )}



                {/* Модальное окно логина */}
                <LoginModalCard
                    open={modalOpen}
                    handleClose={() => setModalOpen(false)}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Header;