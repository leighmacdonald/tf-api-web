import { useQuery } from '@tanstack/react-query';
import { bdEntries } from '@/lib/api.ts';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

export const BDTable = ({ steamid }: { steamid: string }) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['bd', steamid],
        queryFn: async () => {
            return await bdEntries(steamid) ?? [];
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
                    <TableCell>List</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Attributes</TableCell>
                    <TableCell>Proof</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow>
                        <TableCell>{row.list_name}</TableCell>
                        <TableCell>{row.match?.last_seen?.player_name}</TableCell>
                        <TableCell>{row.match?.attributes?.join(', ')}</TableCell>
                        <TableCell>{row.match?.proof?.join(", ")}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
};
