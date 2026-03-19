import { type FC, useCallback, useEffect, useState } from "react"
import { Container, Stack, Typography, Box } from "@mui/material"
import { type IFilm } from "../../../shared/store"
import { Loading, Error, Footer, Header, FilmCard } from "../../../shared/ui"
import { useFavorites } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"

// Компонент страницы со списком избранных фильмов
export const FilmFavorites: FC = () => {
    const { favorites } = useFavorites()
    const [favoriteFilms, setFavoriteFilms] = useState<IFilm[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchFavoriteFilms = useCallback(async () => {
        if (favorites.length === 0) {
            setFavoriteFilms([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const promises = favorites.map(id => FilmsService.getById(id))
            const responses = await Promise.all(promises)
            const films = responses.map(response => response.data)
            setFavoriteFilms(films)
        } catch (error) {
            setError('Не удалось загрузить избранные фильмы')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [favorites])

    useEffect(() => {
        fetchFavoriteFilms()
    }, [favorites, fetchFavoriteFilms])

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <Container maxWidth="xl">
            <Header />

            <Stack
                direction="row"
                spacing={4}
                alignItems="flex-start"
                sx={{ mt: 2 }}
            >
                <Stack spacing={2} flex={1}>
                    <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 3 }}>
                        Избранные фильмы
                    </Typography>

                    {favoriteFilms.length === 0 ? (
                        <Box sx={{ textAlign: 'start' }}>
                            <Typography variant="h6" color="text.secondary">
                                У вас пока нет избранных фильмов
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Добавьте фильмы в избранное, и они появятся здесь
                            </Typography>
                        </Box>
                    ) : (
                        favoriteFilms.map(film => (
                            <FilmCard key={film.id} item={film} />
                        ))
                    )}

                    {/* <PaginationComponent type="films" /> */}
                </Stack>
            </Stack>
            <Footer />
        </Container>
    )
}
