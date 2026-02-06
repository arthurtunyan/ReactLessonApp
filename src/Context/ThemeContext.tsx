import { createContext, useState, useMemo, useCallback, useContext, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (value: Theme) => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");

    const handleThemeChange = useCallback((value: Theme) => {
        setTheme(value);
    }, []);

    const value = useMemo(() => {
        return {
            theme,
            setTheme: handleThemeChange,
        };
    }, [handleThemeChange, theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("useTheme must be used within the same theme");
    }
    return theme;
};

//theme provider holds the acutal state and put it into theme, set theme and usetheme lets any component open/use it