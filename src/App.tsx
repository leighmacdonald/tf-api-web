import type { PropsWithChildren } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const darkTheme = responsiveFontSizes(createTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 12,
        h1: {
            fontSize: 42,
        },
        h2: {
            fontSize: 32,
        },
        h3: {
            fontSize: 24,
        },
        h4: {
            fontSize: 20,
        },
        h5: {
            fontSize: 16,
        },
        h6: {
            fontSize: 12,
        },
    },
    palette: {
        mode: 'dark'
    }
}));


const queryClient = new QueryClient();

export const App = ({ children }: PropsWithChildren) => {
    return <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </ThemeProvider>;
};