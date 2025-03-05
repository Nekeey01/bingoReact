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
import {Label} from "@mui/icons-material";

// transform: scaleX(0.2);
// width: 70%;
// height: 35px;
// margin-top: 15px;
// border-radius: 0 0 6px 6px;
// min-height: unset;
// align-self: flex-end;
// color: white;
// font-weight: 500;
// font-size: 12px;
// margin-right: 10px;
// border-radius: 6px;

// TODO: крч надо определять, на какой позиции сейчас находится кнопка.
//  Мб как то чекать состояние транслейта по игрику, и в зависимости от этого кальком высчитывать куда передвинуть

// Определяем анимацию изменения градиента
const gradientAnimationActive = keyframes`
    0% {
        background-position: 100% 50%;
        //height: 35px;
        ////align-self: flex-end;
        ////margin-right: 10px;
        //width: 70%;
        //margin-left: 22%;
        //border-radius: 0 0 6px 6px;
    }
    100% {
        background-position: 30% 50%;
        //height: inherit;
        ////margin-right: 0;
        //width: 100%;
        //margin-left: 0;
        //border-radius: 0 6px 6px 0;
    }
`;

const gradientAnimationInactive = keyframes`
    0% {
        background-position: 30% 50%;
        //height: inherit;
        ////margin-right: 0;
        //width: 100%;
        //margin-left: 0;
        //border-radius: 0 6px 6px 0;
    }
    100% {
        background-position: 100% 50%;
        //height: 35px;
        ////align-self: flex-end;
        //margin-left: 22%;
        //width: 70%;
        //border-radius: 0 0 6px 6px;
    }
`;

const sizeTabActive = keyframes`
    0% {
        width: 70%;
        margin-left: 22%;
        border-radius: 0 0 6px 6px;
        height: 35px;
        min-height: 35px;
    }
    100% {
        //height: inherit;
        width: 100%;
        margin-left: 0;
        border-radius: 0 6px 6px 0;
        height: 48px;
        min-height: 48px;
    }
`;

const sizeTabInactive = keyframes`
    0% {
        //height: inherit;
        //margin-right: 0;
        width: 100%;
        margin-left: 0;
        border-radius: 0 6px 6px 0;
        height: 48px;
        min-height: 48px;
        
    }
    100% {
        //align-self: flex-end;
        width: 70%;
        margin-left: 22%;
        border-radius: 0 0 6px 6px;
        height: 35px;
        min-height: 35px;
    }
`;

// TODO: Кароч он неправильно считает куда надо пойти. Вохможно, надо переписать условия для анимации.

const slideInFromBottom = keyframes`
  0% {
    transform: translateY(100%);
      //top: 48px;
  }
  100% {
    transform: translateY(0);
      //top: 0px;
  }
`;


const slideOutToBottom = keyframes`
  0% {
    transform: translateY(0);
    //  top: 0px;
  }
  100% {
    transform: translateY(100%);
    //  top: 48px;
  }
`;


const slideOutToTop = keyframes`
    0% {
        //transform: translateY(0);
    transform: translateY(100%);
        //top: 0px;
    }
    100% {
        //transform: translateY(calc(-48px + 29%));
        //transform: translateY(-100%);
    transform: translateY(0);
        //top: -40px;
    }
`;


const slideInFromTop = keyframes`
  0% {
    //transform: translateY(-100%);
    transform: translateY(0);
    //  top: -48px;
  }
  100% {
    //transform: translateY(0);
    transform: translateY(100%);
    //  top: 0px;
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
    //
    // #signin:checked ~ #wrapper { height: 178px; }
    // #signin:checked ~ #wrapper #arrow { left: 32px; }
    // #signin:checked ~ button span { transform: translate3d(0,-72px,0); }
    //
    // #signup:checked ~ #wrapper { height: 262px; }
    // #signup:checked ~ #wrapper #arrow { left: 137px; }
    // #signup:checked ~ button span { transform: translate3d(0,-144px,0); }
    //
    // #reset:checked ~ #wrapper { height: 94px; }
    // #reset:checked ~ #wrapper #arrow { left: 404px; }
    // #reset:checked ~ button span { transform: translate3d(0,0,0); }
};

const TabItem = styled(Tab, {
    // shouldForwardProp: (prop) => prop !== "isSelected",
    shouldForwardProp: (prop) => prop !== "isAbove",
})(({theme, isAbove}) => ({
    position: "initial",
    opacity: 1,
    overflow: "initial",
    // zIndex: 1,
    textTransform: "initial",
    clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 100%, 0% 50%, 0% 0%, 0% 0%)",
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: "#9E9292",
    transition: "clip-path .5s",

    "&:first-of-type": {
        // backgroundColor: "#5fbf47",
        color: "#040440",
        position: "absolute",
        top: isAbove ? "0" : "48px",
        // transform: isAbove ? `translateY(0%)` : `translateY(100%)`,
        background: "linear-gradient(90deg, #3d3737 35%, #5fbf47 75%)",
        backgroundSize: "200% 100%",
        zIndex: isAbove ? '1' : "2",
        // boxShadow: isAbove ? "-10px -10px 5px green" : "-10px -10px 5px red",

        borderRadius: isAbove ? "0 6px 6px 0 " : "0 0 6px 6px",
        height: isAbove ? "48px" : "35px",
        marginLeft: isAbove ? "0%" : "22%",
        width: isAbove ?  "100%" : "70%",
        minHeight: isAbove ? "48px" : "35px",

    },

    "&:not(:first-of-type)": {
        color: "#040440",
        position: "absolute",
        top: isAbove ? "0" : "48px",
        // transform: isAbove ? `translateY(0%) ` : `translateY(0%) `,
        background: "linear-gradient(90deg, #3d3737 35%, #ef172f 75%)",
        backgroundSize: "200% 100%",
        zIndex: isAbove ? '1' : "2",

        borderRadius: isAbove ? "0 6px 6px 0 " : "0 0 6px 6px",
        height: isAbove ? "48px" : "35px",
        marginLeft: isAbove ? "0%" : "22%",
        width: isAbove ?  "100%" : "70%",
        minHeight: isAbove ? "48px" : "35px",

        // borderRadius: isAbove ? "0 6px 6px 0" : "0 0 6px 6px",
        // height: isAbove ? "35px" : "100%" ,
        // marginLeft: isAbove ? "22%" : "0%",
        // width: isAbove ?  "70%" : "100%",

    },


    [`&.${tabClasses.selected}`]: {
        backgroundColor: "#3d3737",
        "&:first-of-type": {
            animation: isAbove ? `${gradientAnimationActive} .5s linear alternate both` : `${gradientAnimationActive} .5s linear alternate both, ${sizeTabActive} .5s linear alternate both, ${slideInFromBottom} .5s linear alternate both`,
            // boxShadow: isAbove ? "-10px -10px 5px green" : "-10px -10px 5px red",
        },

        "&:not(:first-of-type)": {
            animation: isAbove ? `${gradientAnimationActive} .5s linear alternate both` : `${gradientAnimationActive} .5s linear alternate both, ${sizeTabActive} .5s linear alternate both, ${slideOutToTop} .5s linear alternate both`,
            // boxShadow: isAbove ? "-10px -10px 5px red" : "-10px -10px 5px green",
        },
    },

    [`&:not(.${tabClasses.selected})`]: {
        // clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 15% 100%, 15% 70%, 0% 50%, 15% 30%, 15% 0%)",

        "&:first-of-type": {
            backgroundSize: "800% 100%",
            animation: isAbove ? `${gradientAnimationInactive} .5s linear alternate both, ${sizeTabInactive} .5s linear alternate both, ${slideOutToBottom} .5s linear alternate both` : `${gradientAnimationInactive} .5s linear alternate both`,
            // boxShadow: isAbove ? "-10px -10px 5px red" : "-10px -10px 5px green",
        },

        "&:not(:first-of-type)": {
            backgroundSize: "800% 100%",
            animation: isAbove ? `${gradientAnimationInactive} .5s linear alternate both, ${sizeTabInactive} .5s linear alternate both, ${slideInFromTop} .5s linear alternate both` : `${gradientAnimationInactive} .5s linear alternate both`,
            // boxShadow: isAbove ? "-10px -10px 5px red" : "-10px -10px 5px green",

        },
    },


}));

// eslint-disable-next-line react/prop-types
export default function LoginModalCard({open, handleClose}) {
    const [value, setValue] = useState('Login');

    const loginTabRef = useRef(null);
    const registerTabRef = useRef(null);
    const [isLoginAbove, setIsLoginAbove] = useState(true);

    useEffect(() => {
        if (open === false && isLoginAbove === false && value === "Login"){
            setIsLoginAbove(!isLoginAbove);
        }
        else if (open === false && isLoginAbove === true && value === "Registration"){
            setIsLoginAbove(!isLoginAbove);
        }

        console.log(`RENDER SUKA`)
        console.log(`OPEN - ${open}`)
        console.log(`isLoginAbove123 - ${isLoginAbove}`)
    }, [open]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(`setValue - ${value}`)


        if (loginTabRef.current && registerTabRef.current) {
            console.log(`мы зашли сюда isLoginAbove - ${isLoginAbove}`)

            const loginRect = loginTabRef.current.getBoundingClientRect();
            const registerRect = registerTabRef.current.getBoundingClientRect();
            //
            // console.log(`Высота loginRect - ${loginRect.bottom}`)
            // console.log(`Высота registerRect - ${registerRect.top}`)

            setIsLoginAbove(loginRect.bottom === registerRect.top);
                // setIsLoginAbove(loginRect.y < registerRect.y);
        }
        console.log(`isLoginAbove1 - ${isLoginAbove}`)
        console.log(`setValue2 - ${value}`)

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
                            }}
                            orientation="vertical"
                            variant="fullWidth"
                            textColor="inherit"
                            centered={true}
                            onChange={handleChange}
                            aria-label="lab API tabs example">
                            <TabItem
                                label={"Логин"}
                                ref={loginTabRef}
                                isAbove={isLoginAbove}
                                value="Login"
                            />
                            <TabItem
                                // sx={{
                                //     boxShadow: value === "Login" ? "-10px -10px 5px green" : "-10px -10px 5px red"
                                // }}
                                label={"Регистрация"}
                                value="Registration"
                                ref={registerTabRef}
                                isAbove={!isLoginAbove}
                            ></TabItem>
                        </TabList>
                    </Box>

                    <Box>

                        <Box sx={{
                            bgcolor: "#3d3737",
                            borderBottomRightRadius: "15px",
                            borderBottomLeftRadius: "15px",
                            borderTopLeftRadius: "15px",
                            transition: "box-shadow 1s",
                            boxShadow: value === "Login" ? "-10px -10px 5px green" : "-10px -10px 5px red",
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