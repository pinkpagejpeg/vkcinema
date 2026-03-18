import { type FC } from "react"
import { Stack, Typography } from "@mui/material"
import logo from "../../assets/images/logo.svg"

export const Header: FC = () => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={logo} alt="Логотип" height={39} width={50} />
                <Typography fontWeight={700} fontSize="1.25rem">Кино</Typography>
            </Stack>
        </Stack>
    )
}
