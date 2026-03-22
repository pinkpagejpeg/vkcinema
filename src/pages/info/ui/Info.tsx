import { type FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Stack, Typography } from "@mui/material"
import { InfoSkeleton } from "./InfoSkeleton"
import { InfoPoster } from "./InfoPoster"
import { InfoHeader } from "./InfoHeader"
import { InfoRating } from "./InfoRating"
import { InfoDetails } from "./InfoDetails"
import { Error, NothingHere, PageLayout, SubmitModal } from "../../../shared/ui"
import { useFetching, useLocalStorage } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"
import type { IFilm } from "../../../shared/model"

export const Info: FC = () => {
    const { id } = useParams()
    const filmId = Number(id)
    const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', [])
    const [compares, setCompareFilms] = useLocalStorage<number[]>('compare', [])
    const isFavorite = favorites.includes(filmId)
    const isCompare = compares.includes(filmId)
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

    const handleCompareClick = () => {
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

    return (
        <PageLayout>
            {!film ?
                <NothingHere
                    title={'Фильм не найден'}
                    subtitle={'Попробуйте перезагрузить страницу или повторить позже'} />
                :
                <>
                    <Grid container spacing={4}>
                        <Grid
                            size={{ xs: 12, sm: 5, md: 4, lg: 3 }}
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', sm: 'flex-start' }
                            }}
                        >
                            <InfoPoster name={film.name || film.alternativeName} poster={film.poster?.url} />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 7, md: 8, lg: 9 }}>
                            <Stack spacing={2}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid size={{ xs: 12 }}>
                                        <InfoHeader
                                            name={film.name || film.alternativeName}
                                            ageRating={film.ageRating}
                                            enName={film.enName}
                                            isFavorite={isFavorite}
                                            isCompare={isCompare}
                                            onFavoriteClick={handleFavoriteClick}
                                            onCompareClick={handleCompareClick}
                                        />
                                    </Grid>
                                </Grid>

                                <Typography sx={{ width: { xs: '100%', md: '75%' }, wordBreak: 'break-word' }}>
                                    {film.description}
                                </Typography>

                                <InfoDetails
                                    year={film.year}
                                    genres={film.genres}
                                    countries={film.countries}
                                    ageRating={film.ageRating}
                                    movieLength={film.movieLength}
                                />

                                <InfoRating rating={film.rating} />
                            </Stack>
                        </Grid>
                    </Grid>

                    <SubmitModal
                        title={isFavorite ?
                            `Вы хотите удалить фильм ${film.name || film.alternativeName} из избранного?` :
                            `Вы хотите добавить фильм ${film.name || film.alternativeName} в избранное?`
                        }
                        open={open}
                        onClose={handleClose}
                        onConfirm={handleConfirm}
                    />
                </>
            }
        </PageLayout>
    )
}
