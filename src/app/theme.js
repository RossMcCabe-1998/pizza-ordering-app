'use client';

import { createTheme } from '@mui/material/styles';

// light theme
const theme = createTheme({
    palette: {
        mode: 'light',
        primary:  { main: '#1976d2' }, // MUI default blue
        secondary:{ main: '#9c27b0' }, // MUI default purple
    },
});

export default theme;