import { useState, type FC } from "react"
import { NavLink } from "react-router-dom"
import { Card, CardContent, Stack, CardMedia, Typography, Chip, Divider, Button, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { FILM_ITEM_ROUTE } from "../../config"
import type { IFilm } from "../../model"
import { noPhotoIcon } from "../../assets"
import { SubmitModal } from "../submitModal"
import { useCompare, useFavorites } from "../../lib"

interface FilmCardProps {
    item: IFilm
}

export const FilmCard: FC<FilmCardProps> = ({ item }) => {
    const { isFavorite, toggleFavorite } = useFavorites()
    const { addToCompare } = useCompare()
    const [open, setOpen] = useState(false)

    const handleFavoriteClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        toggleFavorite(String(item.id))
        setOpen(false)
    }

    return (
        <>
            <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="flex-start" flexWrap="nowrap">
                        <CardMedia
                            component="img"
                            image={item?.poster?.url ?? noPhotoIcon}
                            alt={item.name ?? ''}
                            sx={{ width: 160, height: 260, borderRadius: 1 }}
                        />

                        <Stack spacing={1} flex={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Stack>
                                    <Typography variant="h6">{item.name || item.alternativeName}</Typography>
                                    {item.enName && (
                                        <Typography variant="body2" color="text.secondary">
                                            {item.enName}
                                        </Typography>
                                    )}
                                </Stack>
                                <Chip label={`${item.ageRating || 0}+`} color="error" size="small" />
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {item.movieLength ? (
                                    <>
                                        <Typography variant="body2">
                                            {item.movieLength >= 60
                                                ? `${Math.floor(item.movieLength / 60)} ч. ${item.movieLength % 60} мин.`
                                                : `${item.movieLength} мин.`}
                                        </Typography>
                                        <Divider orientation="vertical" flexItem />
                                    </>
                                ) : null}

                                {item.year ? (
                                    <>
                                        <Typography variant="body2">{item.year}</Typography>
                                        <Divider orientation="vertical" flexItem />
                                    </>
                                ) : null}

                                <Typography variant="body2">
                                    {item.countries?.map((country) => country.name).join(", ")}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography variant="body2">
                                    {item.genres?.map((genre) => genre.name).join(", ")}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <NavLink to={`${FILM_ITEM_ROUTE}/${item.id}`} style={{ textDecoration: "none" }}>
                                    <Button variant="contained">Подробнее</Button>
                                </NavLink>

                                <IconButton
                                    onClick={() => addToCompare(String(item?.id))}
                                    color="primary"
                                    aria-label="compare"
                                    sx={{
                                        color: '#2196f3',
                                        '&:hover': {
                                            color: '#1976d2'
                                        }
                                    }}
                                >
                                    <CompareArrowsIcon />
                                </IconButton>
                                
                                <IconButton
                                    onClick={handleFavoriteClick}
                                    aria-label="add to favorites"
                                    sx={{
                                        color: '#ff4081',
                                        '&:hover': {
                                            color: '#f50057'
                                        }
                                    }}
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
            <SubmitModal
                title={
                    isFavorite(String(item.id)) ?
                        `Вы хотите удалить фильм ${item.name || item.alternativeName} из избранного?` :
                        `Вы хотите добавить фильм ${item.name || item.alternativeName} в избранное?`
                }
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />
        </>
    )
}