import Settings from '../../components/Edit/Settings'
import BingoView from '../../components/Edit/BingoView'
import Grid from "@mui/material/Grid2";

export default function CreateBingoCard() {
    return (
        <Grid container sx={{
            borderTop: 'var(--page-blocks-divider)',
            height: "-webkit-fill-available",
        }}>
            <Grid size={3} sx={{
                borderRight: 'var(--page-blocks-divider)',
            }}>
                <Settings />
            </Grid>
            <Grid size={9} >
                <BingoView />
            </Grid>
        </Grid>
    );
}