import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const DatePickerWrapper = styled(Box)(({ theme }) => ({
  '& .react-datepicker-popper': {
    zIndex: 20
  },
  '& .react-datepicker-wrapper': {
    width: '100%'
  },
  '& .react-datepicker': {
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    '& .react-datepicker__header': {
      padding: 0,
      border: 'none',
      fontWeight: 'normal',
      backgroundColor: theme.palette.background.paper,
      '&:not(.react-datepicker-year-header)': {
        '& + .react-datepicker__month, & + .react-datepicker__year': {
          margin: theme.spacing(2)
        }
      },
      '&.react-datepicker-year-header': {
        '& + .react-datepicker__month, & + .react-datepicker__year': {
          margin: theme.spacing(2)
        }
      }
    },
    '& .react-datepicker__triangle': {
      display: 'none'
    },
    '& > .react-datepicker__navigation': {
      top: 20,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.action.selected,
      '&.react-datepicker__navigation--previous': {
        width: 26,
        height: 26,
        border: 'none',
        ...(theme.direction === 'ltr' ? { left: 15 } : { right: 15 }),
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='KeyboardArrowLeftRoundedIcon'%3E%3Cpath d='M14.71 15.88 10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z'%3E%3C/path%3E%3C/svg%3E")`,
        '& .react-datepicker__navigation-icon': {
          display: 'none'
        }
      },
      '&.react-datepicker__navigation--next': {
        width: 26,
        height: 26,
        border: 'none',
        ...(theme.direction === 'ltr' ? { right: 15 } : { left: 15 }),
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='KeyboardArrowRightRoundedIcon'%3E%3Cpath d='M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z'%3E%3C/path%3E%3C/svg%3E")`,
        '& .react-datepicker__navigation-icon': {
          display: 'none'
        }
      },
      '&.react-datepicker__navigation--next--with-time': theme.direction === 'ltr' ? { right: 127 } : { left: 127 },
      '&:focus, &:active': {
        outline: 0
      }
    },
    '& .react-datepicker__month-container': {
      paddingTop: theme.spacing(2),
      '& + .react-datepicker__month-container': {
        borderLeft: `1px solid ${theme.palette.divider}`
      }
    },
    '& .react-datepicker__current-month, & .react-datepicker-year-header': {
      lineHeight: 2,
      fontSize: '1rem',
      fontWeight: 'normal',
      letterSpacing: '0.15px',
      marginBottom: theme.spacing(3),
      color: theme.palette.text.primary
    },
    '& .react-datepicker__month-text--today': {
      fontWeight: 'normal',
      '&:not(.react-datepicker__month--selected)': {
        lineHeight: '2.125rem',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          color: theme.palette.grey['50'],
          backgroundColor: theme.palette.primary.main
        }
      }
    },
    '& .react-datepicker__month-text:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '& .react-datepicker__year-text--today': {
      fontWeight: 'normal',
      '&:not(.react-datepicker__year-text--selected)': {
        lineHeight: '2.125rem',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.main
        },
        '&.react-datepicker__year-text--keyboard-selected': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main
          }
        }
      }
    },
    '& .react-datepicker__month-text--keyboard-selected': {
      '&:not(.react-datepicker__month--in-range)': {
        color: theme.palette.text.primary,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        }
      }
    },
    '& .react-datepicker__year-text--keyboard-selected': {
      color: theme.palette.text.primary,
      backgroundColor: `rgba(${theme.palette.main}, 0.06)`,
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: `rgba(${theme.palette.main}, 0.06)`
      }
    },
    '& .react-datepicker__day--selected, & .react-datepicker__month--selected, & .react-datepicker__year-text--selected, & .react-datepicker__quarter--selected':
      {
        color: `${theme.palette.common.white} !important`,
        backgroundColor: `${theme.palette.primary.main} !important`,
        '&:hover': {
          backgroundColor: `${theme.palette.primary.dark} !important`
        }
      },
    '& .react-datepicker__month-text, & .react-datepicker__year-text': {
      margin: theme.spacing(0.25),
      alignItems: 'center',
      lineHeight: '2.25rem',
      display: 'inline-flex',
      justifyContent: 'center',
      borderRadius: theme.shape.borderRadius,
      '&:focus, &:active': {
        outline: 0
      }
    },
    '& .react-datepicker__year--container': {
      paddingTop: theme.spacing(3.2)
    },
    '& .react-datepicker__year-wrapper': {
      maxWidth: 205,
      justifyContent: 'center'
    }
  }
}))

export default DatePickerWrapper
