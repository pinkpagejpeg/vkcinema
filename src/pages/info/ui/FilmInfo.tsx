import { type FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Grid, Box, Badge, Stack, Typography } from "@mui/material"
import { useAppDispatch, useTypedSelector } from "../../../shared/store"
import { Loading, Error, Footer, Header } from "../../../shared/ui"
import { fetchFilmById } from "../../../entities/films"
import { noPhotoIcon } from "../../../shared/assets"

export const FilmInfo: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const { film, loading, error } = useTypedSelector((state) => state.films)

    useEffect(() => {
        if (id) {
            dispatch(fetchFilmById(id))
        }
    }, [id])

    const formatMovieLength = (length?: number | null) => {
        if (!length || length === 0) return "—"
        return length >= 60
            ? `${Math.floor(length / 60)} ч. ${length % 60} мин.`
            : `${length} мин.`
    }

    if (loading) return <Loading />
    if (error) return <Error message={error} />
    if (!film) return null

    return (
        <Container maxWidth="xl">
            <Header />

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
                            style={{ width: '100%', height: '100%', objectFit: 'cover', }}
                        />
                    </Box>
                </Grid>


                <Grid size={9}>
                    <Stack spacing={2}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid>
                                <Stack spacing={0.5}>
                                    <Typography variant="h4">{film.name || film.alternativeName}</Typography>
                                    {film.enName && (
                                        <Typography variant="body1" color="text.secondary">
                                            {film.enName}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid>
                                <Badge color="error" badgeContent={`${film.ageRating || 0}+`} />
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
            <Footer />
        </Container>
    )
}
