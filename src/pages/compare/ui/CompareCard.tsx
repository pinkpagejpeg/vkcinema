import { type FC } from "react"
import { Box, Typography, Chip, Stack, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import type { IFilm } from "../../../shared/model"
import { formatMovieLength } from "../../../shared/lib"
import { noPhotoIcon } from "../../../shared/assets"

interface CompareCardProps {
    film: IFilm
    onRemove: (id: number | null) => void
}

export const CompareCard: FC<CompareCardProps> = ({ film, onRemove }) => {
    const handleRemove = () => {
        onRemove(film.id)
    }

    return (
        <Box sx={{ position: 'relative', height: '100%' }}>
            <IconButton
                size="small"
                onClick={handleRemove}
                sx={{
                    position: 'absolute',
                    top: -8,
                    right: 50,
                    zIndex: 1,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    '&:hover': {
                        bgcolor: 'error.light',
                        color: 'white'
                    }
                }}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>

            <Stack spacing={2} alignItems="center">
                <Box
                    component="img"
                    src={film.poster?.url || noPhotoIcon}
                    alt={film.name || film.alternativeName || ''}
                    sx={{
                        width: 'auto',
                        height: 300,
                        borderRadius: 1,
                        objectFit: 'cover'
                    }}
                />

                <Typography variant="h6" color="primary">
                    {film.name || film.alternativeName || '—'}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {film.year || '—'}
                </Typography>

                <Typography variant="body2">
                    {film.ageRating ? `${film.ageRating}+` : '—'}
                </Typography>

                {film.rating?.kp || film.rating?.imdb ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                            {(film.rating?.kp || film.rating?.imdb)?.toFixed(1)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {film.rating?.kp ? 'Кинопоиск' : 'IMDb'}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary">—</Typography>
                )}

                <Stack direction="row" spacing={0.5} justifyContent="center" gap={0.5}>
                    {film.genres?.slice(0, 3).map((genre) => (
                        <Chip
                            key={genre.name}
                            label={genre.name}
                            size="small"
                            variant="outlined"
                        />
                    ))}
                    {film.genres && film.genres.length > 3 && (
                        <Chip
                            label={`+${film.genres.length - 3}`}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Stack>

                <Typography variant="body2">
                    {formatMovieLength(film.movieLength)}
                </Typography>
            </Stack>
        </Box>
    )
}