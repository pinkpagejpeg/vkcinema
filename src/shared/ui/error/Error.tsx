import type { FC } from "react"
import { Alert, AlertTitle, Container, Stack } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

interface ErrorProps {
    message: string
}

export const Error: FC<ErrorProps> = ({ message }) => {
    return (
        <Container maxWidth="sm">
            <Stack alignItems="center" justifyContent="center" sx={{ height: '30vh' }}>
                <Alert
                    severity="error"
                    variant="outlined"
                    icon={<ErrorOutlineIcon fontSize="small" />}
                    sx={{ width: '100%' }}
                >
                    <AlertTitle>Ошибка</AlertTitle>
                    {message}
                </Alert>
            </Stack>
        </Container>
    )
}
