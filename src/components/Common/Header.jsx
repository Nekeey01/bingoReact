import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../Auth/AuthContext.jsx";
import LoginModalCard from "../../Auth/LoginModalCard.jsx";
import {useState} from "react";
import {useProfile} from "../ProfileContext.jsx";

const pages = {
    0: {"/axios": "Ген axios"},
    1: {"/websocket": "Ген WebSocket"},
    2: {"/comments": "Комменты"},
};
const settings = {
    0: {"#": "Профиль"},
    1: {"#": "Показать жопу"},
    2: {"Yandex": "Яндекс"},
    3: {"Google": "Гугл"},
    4: {"Empty": "Пустой"},
    5: {"logout": "Выйти"},
};

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const {token, logout} = useAuth();
    const [open, setOpen] = useState(false);
    const {userAvatarLink, setAvatarByOAuth, getAvatar, setAvatar} = useProfile();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const navigateTo = (url) => {

        handleCloseUserMenu();
        navigate(url);
    }

    const profileSettingFunc = (func_name) => {
        if (func_name === "logout"){
            logout();
            navigate("/")
        } else if (func_name === "Yandex" || func_name === "Google"){
            setAvatarByOAuth(func_name);
        } else if (func_name === "Empty") {
            setAvatar(null);
        }

        setOpen(false);

    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {token ? (
                        <>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {Object.entries(pages).map(([k, v]) => (
                                    Object.entries(v).map(([url, pageName]) => (
                                        <Button
                                            key={pageName}
                                            onClick={() => navigateTo(url)}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {pageName}
                                        </Button>
                                    ))
                                ))}
                            </Box>
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        {/*<Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/a/ACg8ocIVepitwm4vTv-JBUv7q2ZX_mjqlbkGlnEyWx7rxifw5tBJg_9d=s96-c"/>*/}
                                        <Avatar alt="Remy Sharp" src={userAvatarLink}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {Object.entries(settings).map(([k, v]) => (
                                        Object.entries(v).map(([func_name, pageName]) => (
                                            <MenuItem
                                                key={pageName}
                                                onClick={() => profileSettingFunc(func_name)}
                                                sx={{my: 2, color: 'gray', display: 'block'}}
                                            >
                                                <Typography sx={{textAlign: 'center'}}>{pageName}</Typography>
                                            </MenuItem>
                                        ))
                                    ))}
                                    {/*{settings.map((setting) => (*/}
                                    {/*    <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                                    {/*        <Typography sx={{textAlign: 'center'}}>{setting}</Typography>*/}
                                    {/*    </MenuItem>*/}
                                    {/*))}*/}
                                </Menu>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box sx={{flexGrow: 0, justifyContent: "right"}}>
                                <Button variant="contained" onClick={() => setOpen(true)}>
                                    Войти
                                </Button>
                                <LoginModalCard open={open} handleClose={() => setOpen(false)} />
                            </Box>
                        </>
                    )}
                < /Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;