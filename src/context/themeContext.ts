import React from 'react';

enum Themes {
    LIGHT = 'light',
    DARK = 'dark'
}

export interface ThemeOptions {
    background: string;
    foreground: string;
    // @todo: need to generate more styles for each theme
}

export const themes: Record<keyof typeof Themes, ThemeOptions> = {
    DARK: {
        background: '#282c34',
        foreground: '#fff'
    },
    LIGHT: {
        background: '#fff',
        foreground: '#282c34'
    }
}

export const ThemeContext = React.createContext(themes.DARK);
