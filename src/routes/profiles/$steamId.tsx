import { createFileRoute } from '@tanstack/react-router';
import { sourcebansEntries, steamSummary } from '@/lib/api.ts';
import { HashAvatar } from '@/components/HashAvatar.tsx';
import {
    CircularProgress,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/profiles/$steamId')({
    component: ProfilePage,
    loader: async ({ params }) => {
        const summaries = await steamSummary(params.steamId);
        if (!summaries || summaries.length !== 1) {
            throw 'Could not load user summary';
        }

        return summaries[0];
    }
});

const Locality = ({ state, cc, city }: { state?: string, cc?: string, city?: number }) => {
    return <Typography variant={'h3'}>{[String(city), state, cc].filter(f => f).join(', ')}</Typography>;
};


const AccountAge = ({ age }: { age?: number }) => {
    if (!age) {
        return null;
    }

    return <Typography>{format(new Date(age * 1000), 'dd-MM-yyyy')}</Typography>;
};

const SourcebansTable = ({ steamid }: { steamid: string }) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['sourcebans', steamid],
        queryFn: async () => {
            return await sourcebansEntries(steamid) ?? [];
        }
    });

    if (isPending) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant={'body1'}>{error.message}</Typography>;
    }

    if (!data) {
        return <></>;
    }

    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow>
                        <TableCell>{row.reason}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
};


function ProfilePage() {
    const summary = Route.useLoaderData();

    if (!summary) {
        return <></>;
    }

    return (
        <Stack spacing={4}>
            <Paper>
                <Grid container spacing={2} padding={2}>
                    <Grid size={'auto'}>
                        <HashAvatar hash={summary.avatarhash ?? 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb'} />
                    </Grid>
                    <Grid size={'grow'}>
                        <Stack>
                            <Typography variant={'h1'} color={'textPrimary'}>{summary.personaname}</Typography>
                            <Typography variant={'h2'} color={'textPrimary'}>{summary.realname}</Typography>
                            <Locality state={summary.locstatecode} cc={summary.loccountrycode}
                                      city={summary.loccityid} />
                            <AccountAge age={summary.timecreated} />
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            <div>
                <Typography variant={'h5'}>Sourcebans</Typography>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid container spacing={2} padding={2}>
                            <Grid size={'auto'}>
                                <SourcebansTable steamid={summary.steamid as string} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </Stack>
    );
}
