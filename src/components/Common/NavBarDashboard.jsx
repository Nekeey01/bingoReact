import Typography from '@mui/material/Typography';
import {AppBar, Toolbar, useTheme} from "@mui/material";


// eslint-disable-next-line react/prop-types
export default function NavBarDashboard({open, handleClose, drawerWidth}) {
    const theme = useTheme();
    return (
        <AppBar
            position="absolute"
            sx={{
                flexGrow: 1,
                p: 3,
                transition: theme.transitions.create("margin", {
                    // easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                ...(open && {

                    width: `calc(100% - ${drawerWidth}px)`,

                    transition: theme.transitions.create(["margin", "width"], {
                        // easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.leavingScreen
                    }),
                    // marginLeft: 0
                    // marginLeft: `-${drawerWidth}px`,

                })
            }}
        >
            <Toolbar variant="regular">
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap

                >
                    Dashboard1111111111111111111111111111111111
                </Typography>
            </Toolbar>
        </AppBar>
    );
}