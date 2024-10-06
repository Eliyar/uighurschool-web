/* eslint-disable indent */
import { createTheme, ThemeOptions } from '@mui/material'

import Colors from './colors'

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: Colors.BLUE,
        },
        secondary: {
            main: Colors.SECONDARY,
        },
        error: {
            main: Colors.RED,
        },
        warning: {
            main: Colors.ORANGE,
        },
        info: {
            main: Colors.TEXT,
        },
        success: {
            main: Colors.GREEN,
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            '@media (min-width:600px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontSize: '2rem',
            '@media (min-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontSize: '1.75rem',
            '@media (min-width:600px)': {
                fontSize: '2rem',
            },
        },
        h4: {
            fontSize: '1.5rem',
            '@media (min-width:600px)': {
                fontSize: '1.75rem',
            },
        },
        h5: {
            fontSize: '1.25rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h6: {
            fontSize: '1rem',
            '@media (min-width:600px)': {
                fontSize: '1.25rem',
            },
        },
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant === 'contained' && {
                        color: 'white',
                    }),
                    minHeight: 40,
                    textTransform: 'none',
                    borderRadius: 6,
                }),
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: '12px 16px',
                    fontSize: 'initial',
                    fontWeight: 500,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    backgroundColor: Colors.CONTROLLER_BACKGROUND,
                    fontSize: 14,
                    fontWeight: 500,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: 'transparent',
                },
            },
        },
    },
}

export const theme = createTheme(themeOptions)
