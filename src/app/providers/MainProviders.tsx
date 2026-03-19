import { ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        mode: "light",
    },
})

// Компонент, оборачивающий приложение в Redux Provider для подключения стора
export const MainProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
