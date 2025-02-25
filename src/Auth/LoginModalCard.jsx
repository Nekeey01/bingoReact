import axios from "axios";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";


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

const TabItem = styled(Tab)(({theme}) => ({
// const TabItem = {
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
    flexDirection: "column-reverse",
    "&:before": {
        // transition: "0.2s",
    },

    "&:first-of-type": {
        // clipPath: "polygon(0% 0%, 75% 0, 100% 100%, 0% 100%)",
        backgroundColor: "#5fbf47",
        color: "#040440",

        background: "linear-gradient(90deg, #5fbf47 0%, #5fbf47 100%)",

        "&:before": {
            // opacity: 0,
            // transition: "0.5s",
        },
    },

    "&:not(:first-of-type)": {
        "&": {
            "&:before": {
                // opacity: 0,

                // transition: "0.5s",
            },
            backgroundColor: "#df4759",
            background: "linear-gradient(90deg, #df4759 0%, #df4759 100%)",
            // color: "#df4759"
            color: "#040440",

            // clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
        },

    },

    [`&.${tabClasses.selected}`]: {
        backgroundColor: "#3d3737",
        alignItems: "end",
        // borderRadius: "100px",
        // clipPath: "polygon(0% 0%, 75% 0, 100% 100%, 0% 100%)",
        "&:first-of-type": {
            background: "linear-gradient(90deg, #3d3737 0%, #39732a 100%)",
        },

        "&:not(:first-of-type)": {
            background: "linear-gradient(90deg, #3d3737 0%, #df4759 100%)",

        },

        // "&:before": {
        //     transition: "1.5s",
        // },

        // transform: "scale(1.0, 1.2)",

        "& spanLabel":{
            // transform: "scale(1, calc(1/1.2))",
        }
        // color: "#040440",
    },

    [`&:not(.${tabClasses.selected})`]: {
        // "&:before": {
        //     transition: "1.5s",
        // },
        clipPath: "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 15% 100%, 15% 70%, 0% 50%, 15% 30%, 15% 0%)",

        // clipPath: "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
        // transition: theme.transitions.create(["clip-path"], {
        //     easing: theme.transitions.easing.easeOut,
        //     duration: 12
        // }),
    },


}));


// eslint-disable-next-line react/prop-types
export default function LoginModalCard({open, handleClose}) {
    const [value, setValue] = useState('Login');

    const handleChange = (event, newValue) => {
        setValue(newValue);
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

                            <TabItem label={<spanLabel>Логин</spanLabel>} value="Login"/>
                            <TabItem label="Регистрация" value="Registration"></TabItem>
                            {/*<TabItem label="Registration" value="Registration"/>*/}
                        </TabList>
                    </Box>

                    <Box>
                        {/*<Button>LOX</Button>*/}

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
