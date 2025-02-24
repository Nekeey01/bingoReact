import Footer from "../../components/Common/Footer.jsx";
import NavBarDashboard from "../../components/Common/NavBarDashboard.jsx";
import {Box, Button} from '@mui/material';
import SideMenu from "../../components/Common/SideMenu.jsx";
import {useState} from "react";

const Dashboard = () => {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => {
        setOpen(!open);
    };
    const drawerWidth = 240;
    return (
        <Box sx={{ display: 'flex' }}>
            <NavBarDashboard open={open} handleClose={toggleOpen} drawerWidth={drawerWidth} />
            <SideMenu open={open} handleClose={toggleOpen} drawerWidth={drawerWidth} />
            <Button onClick={toggleOpen}>open</Button>

            {/* Main content */}
            <Box
                component="main"
            >
                Контент страницы
            </Box>
        </Box>
    );
};
export default Dashboard;