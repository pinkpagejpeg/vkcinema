import { type FC } from "react"
import { Container, Stack, CircularProgress } from "@mui/material"

export const Loading: FC = () => {
    return (
        <Container maxWidth="sm">
            <Stack
                alignItems="center"
                justifyContent="center"
                mt="30vh"
                spacing={2}
            >
                <CircularProgress size={60} />
            </Stack>
        </Container>
    )
}
