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
        button: {
            fontWeight: 500,
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
