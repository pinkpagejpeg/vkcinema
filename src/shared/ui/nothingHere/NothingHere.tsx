import { type FC } from "react"
import { Typography, Box } from "@mui/material"

interface NothingHereProps {
    title: string,
    subtitle: string
}

export const NothingHere: FC<NothingHereProps> = ({ title, subtitle }) => {
    return (
        <Box sx={{ textAlign: 'start' }}>
            <Typography variant="h6" color="text.secondary">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
            </Typography>
        </Box>
    )
}
