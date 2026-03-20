import { type FC } from "react"
import { Stack, Typography } from "@mui/material"
import logo from "../../assets/images/logo.svg"

export const Footer: FC = () => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
            px={2}
            mb={2}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={logo} alt="Логотип" height={29} width={40} />
                <Typography fontWeight={700}>Кино</Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary">
                &copy; Кино все права защищены {new Date().getFullYear()}г.
            </Typography>
        </Stack>
    )
}
