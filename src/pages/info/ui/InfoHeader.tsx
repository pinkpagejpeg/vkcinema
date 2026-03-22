import type { FC } from "react"
import { Stack, Typography, Badge, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

interface InfoHeaderProps {
    name: string | null,
    ageRating: number | null,
    enName: string | null,
    isFavorite: boolean,
    isCompare: boolean
    onFavoriteClick: () => void,
    onCompareClick: () => void
}

export const InfoHeader: FC<InfoHeaderProps> = ({ 
    name, 
    ageRating, 
    enName, 
    isFavorite,
    isCompare, 
    onFavoriteClick, 
    onCompareClick 
}) => {
    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                flexWrap="wrap"
            >
                <Typography
                    variant="h4"
                    sx={{
                        wordBreak: 'break-word',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                    }}
                >
                    {name}
                </Typography>

                <Badge
                    color="error"
                    badgeContent={`${ageRating || 0}+`}
                    sx={{
                        '& .MuiBadge-badge': {
                            position: 'relative',
                            transform: 'none',
                            mt: -1,
                            ml: -1.5
                        }
                    }}
                />

                <IconButton
                    onClick={onCompareClick}
                    color="primary"
                    aria-label="add to compare"
                    sx={{
                        color: isCompare ? '#2196f3' : '#b4b4b4',
                        '&:hover': { color: '#1976d2' }
                    }}
                >
                    <CompareArrowsIcon />
                </IconButton>

                <IconButton
                    onClick={onFavoriteClick}
                    aria-label="add to favorites"
                    sx={{
                        color: isFavorite ? '#ff4081' : '#b4b4b4',
                        '&:hover': { color: '#f50057' }
                    }}
                >
                    <FavoriteIcon />
                </IconButton>
            </Stack>

            {enName && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    {enName}
                </Typography>
            )}
        </>
    )
}