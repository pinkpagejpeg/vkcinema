import { useState, type FC, useCallback } from "react"
import { NavLink } from "react-router-dom"
import { Card, CardContent, Stack, CardMedia, Typography, Chip, Divider, Button, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { FILM_ITEM_ROUTE } from "../../config"
import type { IFilm } from "../../model"
import { noPhotoIcon } from "../../assets"
import { SubmitModal } from "../submitModal"
import { useLocalStorage } from "../../lib"

interface FilmCardProps {
    item: IFilm
}

export const FilmCard: FC<FilmCardProps> = ({ item }) => {
    const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', [])
    const [compares, setCompareFilms] = useLocalStorage<number[]>('compare', [])
    const [open, setOpen] = useState(false)
    const filmName = item.name || item.alternativeName
    const filmId = item.id
    const isFavorite = filmId ? favorites.includes(filmId) : false
    const isCompare = filmId ? compares.includes(filmId) : false

    const handleFavoriteClick = useCallback(() => {
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const handleConfirm = useCallback(() => {
        if (!filmId) {
            setOpen(false)
            return
        }

        setFavorites((prev) => {
            if (prev.includes(filmId)) {
                return prev.filter(id => id !== filmId)
            } else {
                return [...prev, filmId]
            }
        })
        setOpen(false)
    }, [item.id, setFavorites])

    const handleCompare = () => {
        if (!filmId) return

        setCompareFilms((prev) => {
            if (prev.includes(filmId)) {
                return prev.filter(existingId => existingId !== filmId)
            }

            if (prev.length === 2) {
                return [prev[1], filmId]
            }

            return [...prev, filmId]
        })
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
                                    <Typography variant="h6">{filmName}</Typography>
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
                                    onClick={handleCompare}
                                    color="primary"
                                    aria-label="compare"
                                    sx={{
                                        color: isCompare ? '#2196f3' : '#b4b4b4',
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
                                        color: isFavorite ? '#ff4081' : '#b4b4b4',
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
                    isFavorite
                        ? `Вы хотите удалить фильм ${filmName} из избранного?`
                        : `Вы хотите добавить фильм ${filmName} в избранное?`
                }
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />
        </>
    )
}