import { createMuiTheme } from '@material-ui/core'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#F5CB5C',
      light: '#fffe8c',
      dark: '#bf9a2b',
      contrastText: '#242424'
    },
    secondary: {
      main: '#242424',
      light: '#4c4c4c',
      dark: '#0D0D0D',
    },
    background: {
      default: '#F4F5F9',
      paper: '#FBFBFB'
    },
    common: {
      white: '#E8EDDF',
      black: '#545454'
    },
    text: {
      primary: 'rgba(36,36,36,0.9)'
    }
  },
  shape: {
    borderRadius: 7
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600
    },
    h2: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600
    },
    h3: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600
    },
    h4: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600
    },
    h5: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600
    },
    h6: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600
    }
  }
})