import { type FC, type ReactNode } from "react"
import { Box, Container } from "@mui/material"
import { Header } from "../header"
import { Footer } from "../footer"

interface PageLayoutProps {
    children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </Container>

            <Footer />
        </Box>
    )
}
