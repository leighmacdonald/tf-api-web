import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { TopNav } from '@/components/TopNav.tsx';


export const Route = createRootRoute({
    component: () => (
        <>


            <Container>
                <Stack spacing={3}>
                    <TopNav />
                    <Outlet />
                </Stack>
            </Container>
            <TanStackRouterDevtools />
        </>
    )
});
