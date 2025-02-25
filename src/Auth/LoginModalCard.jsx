import axios from "axios";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";


import {TabContext, TabList, TabPanel} from '@mui/lab';
import {styled} from "@mui/material/styles";
import {tabClasses} from "@mui/material/Tab";
import {
    Box, Button,
    Modal,
    Tab,

} from "@mui/material";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import {keyframes} from '@mui/system';

// TODO: крч надо определять, на какой позиции сейчас находится кнопка. Мб как то чекать состояние транслейта по игрику, и в зависимости от этого кальком высчитывать куда передвинуть

// Определяем анимацию изменения градиента
const gradientAnimationLogin = keyframes`
    0% {
        background-position: 100% 50%;
        //transform: translateY(100%);

    }
    100% {
        background-position: 30% 50%;
        transform: translateY(0%);
    }
`;

const gradientAnimationLoginOpenModal = keyframes`
    0% {
        background-position: 100% 50%;
        //transform: translateY(0%);

    }
    100% {
        background-position: 30% 50%;
        //transform: translateY(0%);
    }
`;

const gradientAnimationLoginInactive = keyframes`
    0% {
        background-position: 30% 50%;
        transform: translateY(0%);

    }
    100% {
        background-position: 100% 50%;
        transform: translateY(100%);

    }
`;

const gradientAnimationReg = keyframes`
    0% {
        background-position: 100% 50%;
        transform: translateY(0%);

    }
    100% {
        background-position: 30% 50%;
        transform: translateY(-100%);

    }
`;

const gradientAnimationRegInactive = keyframes`
    0% {
        background-position: 30% 50%;
        transform: translateY(-100%);

    }
    100% {
        background-position: 100% 50%;
        transform: translateY(0%);

    }
`;

const gradientAnimationRegInactiveOpenModal = keyframes`
    0% {
        background-position: 30% 50%;
        //transform: translateY(-100%);

    }
    100% {
        background-position: 100% 50%;
        //transform: translateY(0%);

    }
`;
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "#3d3737",
    color: "#ffffff",
    // boxShadow: 24,
    p: 4,
    borderRadius: 2,
    padding: 0,
    background: "none",
    display: "flex",
    flexDirection: "row-reverse",
};


// const TabItem = styled(Tab)(({theme}) => ({
// let isFirstRender = true;
// const TabItem = styled(Tab,
//     {shouldForwardProp: (prop) => prop !== 'isFirstRender',
//     })(({theme}) => ({
//
//     props: ({ isFirstRender }) => isFirstRender,

const TabItem = styled(Tab, {
    shouldForwardProp: (prop) => prop !== "isFirstRender",
})(({theme, isFirstRender}) => ({
    position: "initial",
    opacity: 1,
    overflow: "initial",
    zIndex: 1,
    textTransform: "initial",
    clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 100%, 0% 50%, 0% 0%, 0% 0%)",
    // background: "linear-gradient(90deg, #5fbf47 0%, #5fbf47 100%)",

    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: "#9E9292",
    transition: ".5s",
    // transition: "5.5s",
    flexDirection: "column",
    order: 2,
    // background: "linear-gradient(90deg, #5fbf47 0%, #39732a 100%)",
    "&:before": {
        // transition: "0.2s",
    },

    "&:first-of-type": {
        backgroundColor: "#5fbf47",
        color: "#040440",

        background: "linear-gradient(90deg, #3d3737 35%, #5fbf47 75%)",
        backgroundSize: "200% 100%",

    },

    "&:not(:first-of-type)": {
        background: "linear-gradient(90deg, #3d3737 35%, #ef172f 75%)",
        backgroundSize: "200% 100%",
        color: "#040440",
    },


    [`&.${tabClasses.selected}`]: {
        backgroundColor: "#3d3737",
        "&:first-of-type": {
            // animation: isFirstRender ? `${gradientAnimationLoginOpenModal} .5s linear alternate both` : `${gradientAnimationLogin} .5s linear alternate both`,
            animation: isFirstRender ? `none` : `${gradientAnimationLogin} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: ({isFirstRender}) => isFirstRender,
            //         // props: {isFirstRender: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         // props: {isFirstRender: false},
            //         props: ({isFirstRender})  => isFirstRender,
            //         style: () => ({
            //             animation: `${gradientAnimationLogin} .5s linear alternate both`,
            //         }),
            //     }
            // ]
        },

        "&:not(:first-of-type)": {
            animation: isFirstRender ? 'none' : `${gradientAnimationReg} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: {isFirstRender: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         props: {isFirstRender: false},
            //         style: () => ({
            //             animation: `${gradientAnimationReg} .5s linear alternate both`,
            //         }),
            //     }
            // ]
        },
    },

    [`&:not(.${tabClasses.selected})`]: {
        clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 15% 100%, 15% 70%, 0% 50%, 15% 30%, 15% 0%)",

        "&:first-of-type": {
            backgroundSize: "800% 100%",
            animation: isFirstRender ? 'none' : `${gradientAnimationLoginInactive} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: {isFirstRender: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         props: {isFirstRender: false},
            //         style: () => ({
            //             animation: `${gradientAnimationLoginInactive} .5s linear alternate both`,
            //         }),
            //     }
            // ]
        },

        "&:not(:first-of-type)": {
            backgroundSize: "800% 100%",
            // animation: isFirstRender ? `${gradientAnimationRegInactiveOpenModal} .5s linear alternate both` : `${gradientAnimationRegInactive} .5s linear alternate both`,
            animation: isFirstRender ? `none` : `${gradientAnimationRegInactive} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: {isFirstRender: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         props: {isFirstRender: false},
            //         style: () => ({
            //             animation: `${gradientAnimationRegInactive} .5s linear alternate both`,
            //         }),
            //     }
            // ]
        },
    },


}));


// eslint-disable-next-line react/prop-types
export default function LoginModalCard({open, handleClose}) {
    const [value, setValue] = useState('Login');
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (open && isFirstRender) {
            setIsFirstRender(false);
        }
    }, [open, isFirstRender]);

    // useEffect(() => {
    //     console.log(`isFirstRender1 - ${isFirstRender}`)
    //     setIsFirstRender(!isFirstRender);
    //     console.log(`isFirstRender2 - ${isFirstRender}`)
    //
    // }, [open]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = () => {
      setIsFirstRender(!isFirstRender);
        console.log(`isFirstRender3 - ${isFirstRender}`)

    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                {/*<Box>*/}
                <TabContext value={value}>
                    <Box
                        sx={{
                            borderBottom: 0,
                            flexGrow: 1,
                            display: "flex",
                            width: "50%",
                        }}
                    >
                        <TabList
                            TabIndicatorProps={{
                                sx: {
                                    display: 'none',
                                }
                            }}
                            sx={{
                                width: "100%",
                                // flexDirection: "column",


                                [`&.${tabClasses.selected}`]: {
                                    "&:first-of-type": {
                                        flexDirection: "column",
                                    },

                                    "&:not(:first-of-type)": {
                                        flexDirection: "column-reverse",
                                    },
                                },
                            }}
                            orientation="vertical"
                            variant="fullWidth"

                            textColor="inherit"
                            centered={true}
                            onChange={handleChange}
                            aria-label="lab API tabs example">

                            <TabItem label={"Логин"}  value="Login" isFirstRender={isFirstRender}/>
                            <TabItem label="Регистрация" value="Registration" isFirstRender={isFirstRender}></TabItem>


                            {/*<TabItem label="Registration" value="Registration"/>*/}
                        </TabList>
                    </Box>

                    <Box>
                        <Button onClick={handleClick}>LOX</Button>

                        <Box sx={{
                            bgcolor: "#3d3737",
                            borderBottomRightRadius: "15px",
                            borderBottomLeftRadius: "15px",
                            boxShadow: "-10px -10px 5px green",

                        }}>

                            <TabPanel value="Login"><Login/> </TabPanel>
                            <TabPanel value="Registration"><Register/></TabPanel>
                        </Box>
                    </Box>

                </TabContext>
            </Box>
            {/*<Box sx={modalStyle}>*/}

            {/*</Box>*/}
        </Modal>
    );

}