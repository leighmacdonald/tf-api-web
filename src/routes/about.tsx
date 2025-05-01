import { createFileRoute } from '@tanstack/react-router';
import { Grid, Typography } from '@mui/material';

export const Route = createFileRoute('/about')({
    component: App
});

function App() {
    return (
        <Grid container>
            <Grid size={12}>
                <Typography variant={'h1'}>About</Typography>
            </Grid>
        </Grid>
    );
}
