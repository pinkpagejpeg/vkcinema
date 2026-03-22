import type { FC } from "react"
import { Box } from "@mui/material"
import { noPhotoIcon } from "../../../shared/assets"

interface InfoPosterProps {
    name: string | null,
    poster?: string | null
}

export const InfoPoster: FC<InfoPosterProps> = ({ name, poster }) => {
    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 250, md: 280, lg: 300 },
                maxWidth: 300,
                height: 'auto',
                borderRadius: 1,
                overflow: 'hidden'
            }}
        >
            <img
                src={poster || noPhotoIcon}
                alt={name || undefined}
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block'
                }}
            />
        </Box>
    )
}