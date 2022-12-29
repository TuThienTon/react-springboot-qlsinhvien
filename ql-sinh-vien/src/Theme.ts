import { createTheme } from "@mui/material";
import shadows, { Shadows } from "@mui/material/styles/shadows";
import { checkboxClasses } from '@mui/material/Checkbox';
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: '#5534CC',
          backgroundColor: '#EFEBFF',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          fontSize: '1rem',
          borderRadius: '100px',
          maxWidth: '550px'
        },
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        styleOverrides: {
          // body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          // minWidth: '9vw',
          // borderRadius: '6px'
          ':disabled': {
            opacity: 0.6
          }
        },
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          // minWidth: '9vw',
          // borderRadius: '6px'
          ':disabled': {
            opacity: 0.6
          }
        },
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          [`&.${checkboxClasses.disabled}`]: {
            opacity: 0.6,
          },
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          justifyContent: 'flex-end'
        }
      }
    }
  },
  typography: {
    fontFamily: `'InterFont',  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
  },
  shadows: shadows.map(() => 'none') as Shadows,
  palette: {
    // action: {
    //   disabledBackground: '#F5B66E',
    //   disabled: '#F5B66E'
    // },
    action: {
      disabled: '',
      disabledBackground: '',
      disabledOpacity: 0.6
    },
    primary: {
      main: '#5534CC',
    },
    secondary: {
      main: '#FB8500',
      contrastText: 'white'
    },
    inqr: {
      main: '#0d6efd',
      dark: '#0008FB',
      contrastText: 'white'
    },
    info: {
      main: '#EFEBFF',
      contrastText: '#5534CC'
    },
    bmsCancel: {
      light: '#e9ecef',
      main: '#EFF0F6',
      dark: '#b3b3b3',
      contrastText: 'black'
    },
  },
})


declare module '@mui/material/styles' {
  interface Palette {
    bmsCancel: Palette['primary'];
    inqr: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    bmsCancel?: PaletteOptions['primary'];
    inqr?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    bmsCancel: true;
    inqr: true;
  }
}


export default theme;