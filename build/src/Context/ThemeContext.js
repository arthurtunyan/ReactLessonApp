import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useMemo, useCallback, useContext } from "react";
const ThemeContext = createContext(null);
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const handleThemeChange = useCallback((value) => {
        setTheme(value);
    }, []);
    const value = useMemo(() => {
        return {
            theme,
            setTheme: handleThemeChange,
        };
    }, [handleThemeChange, theme]);
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
};
export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("useTheme must be used within the same theme");
    }
    return theme;
};
//# sourceMappingURL=ThemeContext.js.map
//# sourceMappingURL=ThemeContext.js.map