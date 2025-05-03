import { useQuery } from '@tanstack/react-query';
import { sourcebansEntries } from '@/lib/api.ts';
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

export const SourcebansTable = ({ steamid }: { steamid: string }) => {
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
                    <TableCell>Site</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Expires</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow>
                        <TableCell>{row.site_name}</TableCell>
                        <TableCell>{row.persona_name}</TableCell>
                        <TableCell>{row.reason}</TableCell>
                        <TableCell>{row.permanent ? 'Permanent' : row.expires_on}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
};
