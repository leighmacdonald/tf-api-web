import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';
import { styled } from '@mui/material';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Bar = () => {
    return <Toolbar>
        <Button component={Link} to={'/'}>Home</Button>
        <Button component={Link} to={'/about'}>About</Button>
    </Toolbar>;
};

export const TopNav = () => {
    return <>
        <AppBar position="fixed">
            <Bar />
        </AppBar>
        <Offset />
    </>;
};