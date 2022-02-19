import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';
import TextService from './Services/TextService';
import LanguageService from './Services/LanguageService';


//#e01e27 - Rød
//#550307 - mørke rød
//#5c0c0d - Anden mørke rød

const theme = createTheme({
  palette: {
    primary: {
      main: '#e01e27',
    },
    secondary: {
      main: '#5c0c0d',
    },
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LanguageService>
        <TextService>
          <App />
        </TextService>
      </LanguageService>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
