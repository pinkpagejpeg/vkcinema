import { type FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Grid, Box, Badge, Stack, Typography, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { InfoSkeleton } from "./InfoSkeleton"
import { Error, Footer, Header, SubmitModal } from "../../../shared/ui"
import { noPhotoIcon } from "../../../shared/assets"
import { formatMovieLength, useFetching, useLocalStorage } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"
import type { IFilm } from "../../../shared/model"

export const Info: FC = () => {
    const { id } = useParams()
    const filmId = Number(id)
    const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', [])
    const [_, setCompareFilms] = useLocalStorage<number[]>('compare', [])
    const isFavorite = favorites.includes(filmId)
    const [film, setFilm] = useState<IFilm | null>(null)
    const [open, setOpen] = useState(false)

    const [fetchFilmById, loading, error] = useFetching(async (id: string) => {
        const { data } = await FilmsService.getById(id)
        setFilm(data)
    })

    useEffect(() => {
        if (id) {
            fetchFilmById(id)
        }
    }, [id])

    const handleFavoriteClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        if (!filmId) {
            setOpen(false)
            return
        }

        setFavorites((prev) => {
            if (prev.includes(filmId)) {
                return prev.filter(i => i !== filmId)
            } else {
                return [...prev, filmId]
            }
        })
        setOpen(false)
    }

    const handleCompare = () => {
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

    if (loading) return <InfoSkeleton />
    if (error) return <Error message={error} />
    if (!film) return null

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
                <Grid container spacing={4}>
                    {/* Левая колонка с постером */}
                    <Grid
                        size={{ xs: 12, sm: 5, md: 4, lg: 3 }}
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', sm: 'flex-start' }
                        }}
                    >
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
                                src={film?.poster?.url || noPhotoIcon}
                                alt={film.name || undefined}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Правая колонка с информацией */}
                    <Grid size={{ xs: 12, sm: 7, md: 8, lg: 9 }}>
                        <Stack spacing={2}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid size={{ xs: 12 }}>
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
                                            {film.name || film.alternativeName}
                                        </Typography>
                                        <Badge
                                            color="error"
                                            badgeContent={`${film.ageRating || 0}+`}
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
                                            onClick={handleCompare}
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
                                    {film.enName && (
                                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                            {film.enName}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>

                            <Typography
                                sx={{
                                    width: { xs: '100%', md: '75%' },
                                    wordBreak: 'break-word'
                                }}
                            >
                                {film.description}
                            </Typography>

                            <Stack spacing={1}>
                                <Typography variant="h5">О фильме</Typography>
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 5, sm: 4, md: 3 }}>
                                        <Stack spacing={0.5}>
                                            <Typography fontWeight={500}>Год производства</Typography>
                                            <Typography fontWeight={500}>Страна</Typography>
                                            <Typography fontWeight={500}>Жанр</Typography>
                                            <Typography fontWeight={500}>Возрастное ограничение</Typography>
                                            <Typography fontWeight={500}>Длительность</Typography>
                                        </Stack>
                                    </Grid>

                                    <Grid size={{ xs: 7, sm: 8, md: 9 }}>
                                        <Stack spacing={0.5}>
                                            <Typography sx={{ wordBreak: 'break-word' }}>
                                                {film.year || "—"}
                                            </Typography>
                                            <Typography sx={{ wordBreak: 'break-word' }}>
                                                {film.countries?.map((c) => c.name).join(", ") || "—"}
                                            </Typography>
                                            <Typography sx={{ wordBreak: 'break-word' }}>
                                                {film.genres?.map((g) => g.name).join(", ") || "—"}
                                            </Typography>
                                            <Typography>{film.ageRating || 0}+</Typography>
                                            <Typography>{formatMovieLength(film.movieLength)}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="h5">Рейтинг</Typography>
                                {film.rating && (film.rating.kp !== 0 || film.rating.imdb !== 0) ? (
                                    <>
                                        {film.rating.kp !== 0 && (
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 4, sm: 3, md: 2 }}>
                                                    <Typography fontWeight={500}>Кинопоиск</Typography>
                                                </Grid>
                                                <Grid size={{ xs: 8, sm: 9, md: 10 }}>
                                                    <Typography>{film.rating.kp}</Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {film.rating.imdb !== 0 && (
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 4, sm: 3, md: 2 }}>
                                                    <Typography fontWeight={500}>IMDb</Typography>
                                                </Grid>
                                                <Grid size={{ xs: 8, sm: 9, md: 10 }}>
                                                    <Typography>{film.rating.imdb}</Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </>
                                ) : (
                                    <Typography color="text.secondary">
                                        Недостаточно оценок, рейтинг формируется
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>

            <Footer />

            <SubmitModal
                title={isFavorite ?
                    `Вы хотите удалить фильм ${film.name || film.alternativeName} из избранного?` :
                    `Вы хотите добавить фильм ${film.name || film.alternativeName} в избранное?`
                }
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />
        </Box>
    )
}
