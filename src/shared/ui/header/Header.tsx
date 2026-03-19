import { type FC } from "react"
import { Stack, Typography } from "@mui/material"
import logo from "../../assets/images/logo.svg"
import { FILM_FAVORITES_ROUTE, FILM_LIST_ROUTE } from "../../config"

const menu = [
    { label: 'Коллекция', href: FILM_LIST_ROUTE },
    { label: 'Избранное', href: FILM_FAVORITES_ROUTE },
    { label: 'Сравнение', href: '/compare' }
]

export const Header: FC = () => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={logo} alt="Логотип" height={39} width={50} />
                <Typography fontWeight={700} fontSize="1.25rem">Кино</Typography>
            </Stack>

            <Stack direction="row" spacing={3}>
                {menu.map(item => (
                    <Typography
                        key={item.href}
                        component="a"
                        href={item.href}
                        sx={{
                            cursor: 'pointer',
                            color: 'text.primary',
                            textDecoration: 'none',
                            '&:hover': { color: 'primary.main' }
                        }}
                    >
                        {item.label}
                    </Typography>
                ))}
            </Stack>
        </Stack>
    )
}
