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

// TODO: крч надо определять, на какой позиции сейчас находится кнопка.
//  Мб как то чекать состояние транслейта по игрику, и в зависимости от этого кальком высчитывать куда передвинуть

// Определяем анимацию изменения градиента
const gradientAnimationLogin = keyframes`
    0% {
        background-position: 100% 50%;
        //transform: translateY(100%);

    }
    100% {
        background-position: 30% 50%;
        //transform: translateY(0%);
    }
`;

const slideInFromBottom = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const gradientAnimationLoginInactive = keyframes`
    0% {
        background-position: 30% 50%;
        //transform: translateY(0%);

    }
    100% {
        background-position: 100% 50%;
        //transform: translateY(100%);

    }
`;

const slideOutToBottom = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;


const gradientAnimationReg = keyframes`
    0% {
        background-position: 100% 50%;
        //transform: translateY(0%);

    }
    100% {
        background-position: 30% 50%;
        //transform: translateY(-100%);

    }
`;

const slideOutToTop = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const gradientAnimationRegInactive = keyframes`
    0% {
        background-position: 30% 50%;
        //transform: translateY(-100%);

    }
    100% {
        background-position: 100% 50%;
        //transform: translateY(0%);

    }
`;

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
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
// let isSelected = true;
// const TabItem = styled(Tab,
//     {shouldForwardProp: (prop) => prop !== 'isSelected',
//     })(({theme}) => ({
//
//     props: ({ isSelected }) => isSelected,

const TabItem = styled(Tab, {
    // shouldForwardProp: (prop) => prop !== "isSelected",
    shouldForwardProp: (prop) => prop !== "isAbove",
})(({theme, isAbove}) => ({
    position: "initial",
    opacity: 1,
    overflow: "initial",
    zIndex: 1,
    textTransform: "initial",
    clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 100%, 0% 50%, 0% 0%, 0% 0%)",
    // background: "linear-gradient(90deg, #5fbf47 0%, #5fbf47 100%)",

    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: "#9E9292",
    transition: "clip-path .5s",
    // transition: "5.5s",
    // flexDirection: "column",
    // order: 2,
    // background: "linear-gradient(90deg, #5fbf47 0%, #39732a 100%)",
    "&:before": {
        // transition: "0.2s",
    },

    "&:first-of-type": {
        backgroundColor: "#5fbf47",
        color: "#040440",
        position: "relative",
        transform: isAbove ? `translateY(0)` : `translateY(100%)`,


        background: "linear-gradient(90deg, #3d3737 35%, #5fbf47 75%)",
        backgroundSize: "200% 100%",

    },

    "&:not(:first-of-type)": {
        background: "linear-gradient(90deg, #3d3737 35%, #ef172f 75%)",
        backgroundSize: "200% 100%",
        color: "#040440",
        position: "relative",
        // top: isAbove ? `-50%` : `0`,
        transform: isAbove ? `translateY(-100%)` : `translateY(0)`,

    },


    [`&.${tabClasses.selected}`]: {
        backgroundColor: "#3d3737",
        "&:first-of-type": {
            // animation: isSelected ? `${gradientAnimationLoginOpenModal} .5s linear alternate both` : `${gradientAnimationLogin} .5s linear alternate both`,
            // animation: isSelected ? `none` : `${gradientAnimationLogin} .5s linear alternate both`,
            animation: isAbove ? `${gradientAnimationLogin} .5s linear alternate both` : `${gradientAnimationLogin} .5s linear alternate both, ${slideInFromBottom} .5s linear alternate both`,

        },

        "&:not(:first-of-type)": {
            // animation: isSelected ? 'none' : `${gradientAnimationReg} .5s linear alternate both`,
            animation: isAbove ? `${gradientAnimationReg} .5s linear alternate both` : `${gradientAnimationReg} .5s linear alternate both, ${slideOutToTop} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: {isSelected: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         props: {isSelected: false},
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
            // animation: isSelected ? 'none' : `${gradientAnimationLoginInactive} .5s linear alternate both`,
            animation: isAbove ? `${gradientAnimationLoginInactive} .5s linear alternate both, ${slideOutToBottom} .5s linear alternate both` : `${gradientAnimationLoginInactive} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: {isSelected: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         props: {isSelected: false},
            //         style: () => ({
            //             animation: `${gradientAnimationLoginInactive} .5s linear alternate both`,
            //         }),
            //     }
            // ]
        },

        "&:not(:first-of-type)": {
            backgroundSize: "800% 100%",
            // transform: "translateY(0%)",

            // animation: isSelected ? `${gradientAnimationRegInactiveOpenModal} .5s linear alternate both` : `${gradientAnimationRegInactive} .5s linear alternate both`,
            // animation: isSelected ? `none` : `${gradientAnimationRegInactive} .5s linear alternate both`,
            animation: isAbove ? `${gradientAnimationRegInactive} .5s linear alternate both, ${slideInFromTop} .5s linear alternate both` : `${gradientAnimationRegInactive} .5s linear alternate both`,

            // variants: [
            //     {
            //         props: {isSelected: true},
            //         style: () => ({
            //             animation: "none",
            //         }),
            //     },
            //     {
            //         props: {isSelected: false},
            //         style: () => ({
            //             animation: `${gradientAnimationRegInactive} .5s linear alternate both`,
            //         }),
            //     }
            // ]
        },
    },


}));

//TODO: Кароче все вроде работает, но надо чет сделать с рендером.
// Как то менять\понимать кто находится выше. Трабл в том, что он не успевает отследить, когда значение меняется.
// т.е оно меняется, но функции не видят этого изменения. Крч внутри функций все изменения недоступны, мб они срабатывают до изменения ДОМа

// eslint-disable-next-line react/prop-types
export default function LoginModalCard({open, handleClose}) {
    const [value, setValue] = useState('Login');
    const [isFirstRender, setIsFirstRender] = useState(true);

    // useEffect(() => {
    //     if (open && isFirstRender) {
    //         console.log(`isFirstRender1 - ${isFirstRender}`)
    //         setIsFirstRender(!isFirstRender);
    //     }
    //     console.log(`isFirstRender2 - ${isFirstRender}`)
    //
    // }, [open, isFirstRender]);
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
        // else if (open === false && isLoginAbove === true){
        //     if (loginTabRef.current && registerTabRef.current) {
        //         console.log("WE TUT NAHUY")
        //         const loginRect = loginTabRef.current.getBoundingClientRect();
        //         const registerRect = registerTabRef.current.getBoundingClientRect();
        //
        //         setIsLoginAbove(loginRect.bottom === registerRect.top);
        //     }
        // }
        // setIsLoginAbove(!isLoginAbove);
        console.log(`RENDER SUKA`)
        console.log(`OPEN - ${open}`)
        console.log(`isLoginAbove123 - ${isLoginAbove}`)
    }, [open]);

    // useEffect(() => {
    //     console.log(`isFirstRender1 - ${isSelected}`)
    //     setIsFirstRender(!isSelected);
    //     console.log(`isFirstRender2 - ${isSelected}`)
    //
    // }, [open]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(`setValue - ${value}`)


        if (loginTabRef.current && registerTabRef.current) {
            console.log(`мы зашли сюда isLoginAbove - ${isLoginAbove}`)

            const loginRect = loginTabRef.current.getBoundingClientRect();
            const registerRect = registerTabRef.current.getBoundingClientRect();

            console.log(`Высота loginRect - ${loginRect.bottom}`)
            console.log(`Высота registerRect - ${registerRect.top}`)

            setIsLoginAbove(loginRect.bottom === registerRect.top);
        }
        console.log(`isLoginAbove1 - ${isLoginAbove}`)
        console.log(`setValue2 - ${value}`)

    };

    const handleClick = () => {
        // setIsFirstRender(!isFirstRender);
        // console.log(`isLoginAbove2 - ${isLoginAbove}`)
        // const loginRect = loginTabRef.current.getBoundingClientRect();
        // const registerRect = registerTabRef.current.getBoundingClientRect();
        //
        // console.log(`Высота1 loginRect - ${loginRect.top}`)
        // console.log(`Высота1 registerRect - ${registerRect.top}`)


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


                                // [`&.${tabClasses.selected}`]: {
                                //     "&:first-of-type": {
                                //         flexDirection: "column",
                                //     },
                                //
                                //     "&:not(:first-of-type)": {
                                //         flexDirection: "column-reverse",
                                //     },
                                // },
                            }}
                            orientation="vertical"
                            variant="fullWidth"

                                // value={"Registration"}
                            textColor="inherit"
                            centered={true}
                            onChange={handleChange}
                            aria-label="lab API tabs example">

                            {/*<Tab label={"Логин"}  value="Login" />*/}
                            {/*<Tab label="Регистрация" value="Registration" ></Tab>*/}
                            <TabItem
                                label={"Логин"}
                                ref={loginTabRef}
                                isAbove={isLoginAbove}
                                value="Login"
                                // isSelected={isFirstRender}
                            />
                            <TabItem
                                label="Регистрация"
                                value="Registration"
                                // isSelected={isFirstRender}
                                ref={registerTabRef}
                                isAbove={!isLoginAbove}
                            ></TabItem>


                            {/*<TabItem label="Registration" value="Registration"/>*/}
                        </TabList>
                    </Box>

                    <Box>
                        {/*<Button onClick={handleClick}>LOX</Button>*/}

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