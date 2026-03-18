import { ThemeProvider, createTheme } from "@mui/material"
import { Provider } from "react-redux"
import { store } from "../stores"

const theme = createTheme({
  palette: {
    mode: "light",
  },
})

// Компонент, оборачивающий приложение в Redux Provider для подключения стора
export const MainProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </Provider>
    )
}
