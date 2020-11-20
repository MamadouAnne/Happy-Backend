import React, { useEffect } from 'react';
import './styles/global.css';
import Routes from './components/Routes'
import ThemeContext from './context/ThemeContext';
import { Container, Fab, Paper } from '@material-ui/core';
import { useContext } from 'react';

function App() {
  const themeContext = useContext(ThemeContext);

  const handleToggle = () => {
    themeContext.toggle()
}

  return (
    <Paper>

      <Routes />
      <div style={{ position: 'fixed', top: '5px', left: '5px', width:'20px', height: '10px', cursor:"pointer"}} 
      onClick={handleToggle}>
        { themeContext.lightMode ? '🌑' : '🌕'}
      </div>
    </Paper>
  )
}

export default App;
