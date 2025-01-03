import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import App from './App';
import './index.css'; // ایمپورت CSS در بالای همه

// ایجاد کش برای RTL
const cacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Arial","shabnam", sans-serif,', // Replace with your desired font family
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter", "Arial","shabnam"sans-serif', // Ensure the font applies to the entire document
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "black",
          fontWeight: 1000,
          background: "#BEDBFE"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: '4px',
          border: "1px soid red",
          '&.Mui-focused': {
            backgroundColor: 'white', // Background when focused
          },
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#5FA4F9",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </CacheProvider>
);
