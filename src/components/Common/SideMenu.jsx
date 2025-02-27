import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import {useState} from "react";
import {Button} from "@mui/material";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

// eslint-disable-next-line react/prop-types
export default function SideMenu({open, handleClose, drawerWidth}) {


    return (
        <Drawer
            sx = {{
                width: drawerWidth,
            }}
            // variant="permanent"
            // sx={{
            //     display: {xs: 'none', md: 'block'},
            //     [`& .${drawerClasses.paper}`]: {
            //         backgroundColor: 'background.paper',
            //     },
            // }}
            open={open}
            onClick={handleClose}
        >
            <Box
                sx={{
                    display: 'flex',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                }}
            >
            </Box>
            <Divider/>
            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <MenuContent/>
            </Box>
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    sizes="small"
                    alt="Riley Carter"
                    src="/static/images/avatar/7.jpg"
                    sx={{width: 36, height: 36}}
                />
                <Box sx={{mr: 'auto'}}>
                    <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                        Riley Carter
                    </Typography>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        riley@email.com
                    </Typography>
                </Box>
            </Stack>
        </Drawer>
    );
}