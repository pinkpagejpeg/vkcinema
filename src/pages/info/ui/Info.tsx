import { type FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Grid, Box, Badge, Stack, Typography, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Error, Footer, Header, SubmitModal } from "../../../shared/ui"
import { noPhotoIcon } from "../../../shared/assets"
import { useFavorites, useFetching } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"
import type { IFilm } from "../../../shared/model"
import { InfoSkeleton } from "./InfoSkeleton"

export const Info: FC = () => {
    const { id } = useParams()
    const { isFavorite, toggleFavorite } = useFavorites()
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

    const formatMovieLength = (length?: number | null) => {
        if (!length || length === 0) return "—"
        return length >= 60
            ? `${Math.floor(length / 60)} ч. ${length % 60} мин.`
            : `${length} мин.`
    }

    const handleFavoriteClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        toggleFavorite(String(film?.id))
        setOpen(false)
    }

    if (loading) return <InfoSkeleton />
    if (error) return <Error message={error} />
    if (!film) return null

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={3}>
                        <Box
                            sx={{
                                width: 300,
                                height: 400,
                                borderRadius: 1,
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                src={film?.poster?.url || noPhotoIcon}
                                alt={film.name || undefined}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={9}>
                        <Stack spacing={2}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="h4">{film.name || film.alternativeName}</Typography>
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
                                        <Typography variant="body1" color="text.secondary">
                                            {film.enName}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>

                            <Typography sx={{ width: "75%" }}>{film.description}</Typography>

                            <Stack spacing={1}>
                                <Typography variant="h5">О фильме</Typography>
                                <Grid container spacing={4}>
                                    <Grid>
                                        <Stack spacing={0.5}>
                                            <Typography fontWeight={500}>Год производства</Typography>
                                            <Typography fontWeight={500}>Страна</Typography>
                                            <Typography fontWeight={500}>Жанр</Typography>
                                            <Typography fontWeight={500}>Возрастное ограничение</Typography>
                                            <Typography fontWeight={500}>Длительность</Typography>
                                        </Stack>
                                    </Grid>
                                    
                                    <Grid>
                                        <Stack spacing={0.5}>
                                            <Typography>{film.year || "—"}</Typography>
                                            <Typography>
                                                {film.countries?.map((c) => c.name).join(", ") || "—"}
                                            </Typography>
                                            <Typography>
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
                                                <Grid>
                                                    <Typography fontWeight={500}>Кинопоиск</Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography>{film.rating.kp}</Typography>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {film.rating.imdb !== 0 && (
                                            <Grid container spacing={2}>
                                                <Grid>
                                                    <Typography fontWeight={500}>IMDb</Typography>
                                                </Grid>
                                                <Grid>
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
                title={isFavorite(String(film.id)) ?
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
