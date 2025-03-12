import Settings from '../../components/Edit/Settings'
import View from '../../components/Edit/View'
import Grid from "@mui/material/Grid2";

export default function CreateBingoCard() {
    return (
        <Grid container sx={{
            height: "fill-available",
        }}>
            <Grid size={3} sx={{
                borderRight: 'var(--page-blocks-divider)',
            }}>
                <Settings />
            </Grid>
            <Grid size={9} >
                <View />
            </Grid>
        </Grid>
    );
}