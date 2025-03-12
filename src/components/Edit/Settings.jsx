import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Tab} from "@mui/material";
import React from "react";
import {SettingsIcon, BrushIcon} from "lucide-react";
import SettingsMain from "./SettingsMain.jsx";

export default function CreateBingoCard() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{
                paddingX: 'var(--main-padding)',
                borderBottom: 'var(--page-blocks-divider)',
            }}>
                <TabList onChange={handleChange} className={"edit-tab-list"}>
                    <Tab icon={<SettingsIcon/>} iconPosition={"start"} label="Настройка" value="1"/>
                    <Tab icon={<BrushIcon/>} iconPosition={"start"} label="Дизайн" value="2"/>
                </TabList>
            </Box>
            <Box>
                <TabPanel value="1" sx={{paddingX: 'var(--main-padding)'}}>
                    <SettingsMain/>
                </TabPanel>

                <TabPanel value="2" sx={{paddingX: 'var(--main-padding)'}}>
                    Item Two
                </TabPanel>
            </Box>
        </TabContext>
    );
}