import { createContext } from 'react';

const ThemeContext = createContext({
    darkMode: true,
    toggle: () => {}
});

export default ThemeContext;