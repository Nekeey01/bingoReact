import axios from "axios";
import {Box, Button, IconButton, SvgIcon, Tab} from "@mui/material";
import {Facebook, GitHub, Google} from "@mui/icons-material";
import {createTheme, styled, ThemeProvider} from '@mui/material/styles'
import Stack from "@mui/material/Stack";


const SvtOAuth = styled(SvgIcon)(() => ({
    fontSize: "2.2rem",
}));



export default function OAuthProviders() {

    const handleOAuthLogin = async (provider) => {

        console.log(`provider = ${provider}`)

        if (provider === "Google") {
            const {data} = await axios.get("http://localhost:8000/gLogin");
            window.location.href = data.auth_url;
        } else if (provider === "Yandex") {
            const {data} = await axios.get("http://localhost:8000/yaLogin");
            window.location.href = data.auth_url;
        }
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                // bgcolor: "#333",
                boxShadow: "0px 0px 10px 1px rgb(23, 23, 23) inset",
                maxWidth: "50%",
                marginLeft: "25%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IconButton
                // color={"ochre.google"}

                onClick={() => handleOAuthLogin("Google")}
            >
                <SvtOAuth>
                    <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"
                         fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                fill="#4285F4"></path>
                            <path
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                fill="#34A853"></path>
                            <path
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                fill="#FBBC05"></path>
                            <path
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                fill="#EB4335"></path>
                        </g>
                    </svg>
                </SvtOAuth>
            </IconButton>

            <IconButton
                onClick={() => handleOAuthLogin("Yandex")}
            >
                <SvtOAuth>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="22"
                              fill="#ff2e0a"></rect>
                        <path
                            d="M25.2438 12.3208H23.0173C19.2005 12.3208 17.292 14.2292 17.292 17.0919C17.292 20.2726 18.5643 21.863 21.427 23.7714L23.6535 25.3618L17.292 35.222H12.2029L18.2463 26.316C14.7475 23.7714 12.839 21.5449 12.839 17.41C12.839 12.3208 16.3378 8.82202 23.0173 8.82202H29.6969V35.222H25.2438V12.3208Z"
                            fill="white"></path>
                    </svg>
                </SvtOAuth>
            </IconButton>


            {/*<Button*/}
            {/*    fullWidth*/}
            {/*    variant="contained"*/}
            {/*    startIcon={<Google/>}*/}
            {/*    sx={{mb: 1, bgcolor: "rgba(62,115,202,0.52)", color: "white"}}*/}
            {/*    // sx={{mb: 1, bgcolor: "rgba(72,184,55,0.52)", color: "white"}}*/}
            {/*    onClick={() => handleOAuthLogin("Google")}*/}
            {/*>*/}
            {/*    Войти через Google*/}
            {/*</Button>*/}

            {/*<Button*/}
            {/*    fullWidth*/}
            {/*    variant="contained"*/}
            {/*    // startIcon={<Facebook/>}*/}
            {/*    startIcon={<SvgIcon>*/}
            {/*        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*            <rect width="44" height="44" rx="22"*/}
            {/*                  fill="#ff2e0a"></rect>*/}
            {/*            <path*/}
            {/*                d="M25.2438 12.3208H23.0173C19.2005 12.3208 17.292 14.2292 17.292 17.0919C17.292 20.2726 18.5643 21.863 21.427 23.7714L23.6535 25.3618L17.292 35.222H12.2029L18.2463 26.316C14.7475 23.7714 12.839 21.5449 12.839 17.41C12.839 12.3208 16.3378 8.82202 23.0173 8.82202H29.6969V35.222H25.2438V12.3208Z"*/}
            {/*                fill="white"></path>*/}
            {/*        </svg>*/}
            {/*    </SvgIcon>}*/}
            {/*    // sx={{mb: 1, bgcolor: "rgba(198,64,41,0.37)", color: "white"}}*/}
            {/*    sx={{mb: 1, bgcolor: "#333", color: "white"}}*/}
            {/*    // sx={{mb: 1, bgcolor: "#ff2e0a", color: "white"}}*/}
            {/*    onClick={() => handleOAuthLogin("Yandex")}*/}
            {/*>*/}
            {/*    Войти через Яндекс*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    fullWidth*/}
            {/*    variant="contained"*/}
            {/*    startIcon={<GitHub/>}*/}
            {/*    sx={{mb: 2, bgcolor: "#333", color: "white"}}*/}
            {/*    onClick={() => handleOAuthLogin("GitHub")}*/}
            {/*>*/}
            {/*    Войти через GitHub*/}
            {/*</Button>*/}
        </Stack>
    );
}