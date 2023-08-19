import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyling from './globalStyles'
import GlobalStyles from '@mui/material/GlobalStyles'
import palette from './palette'

let theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Lato'
  },

  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
        elevation: 0
      }
    },
    MuiAppBar: {
      defaultProps: {
        variant: 'elevation',
        elevation: 0
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none'
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
        fontSize: 'small'
      }
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
        color: 'primary',
        size: 'small'
      },
      styleOverrides: {
        root: {
          '&:active': {
            boxShadow: 'unset'
          }
        }
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: 'off',
        size: 'small'
      },
      styleOverrides: {
        root: {
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 31, 90, 0.50)'
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2rem'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'unset'
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '1rem'
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        action: {
          margin: 0
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginRight: 0
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '1rem'
        }
      }
    }
  }
})

theme = responsiveFontSizes(theme)

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles styles={() => GlobalStyling(theme)} />
    {children}
  </ThemeProvider>
)
