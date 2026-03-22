import { type FC, useEffect, useState } from "react"
import { Stack, Typography } from "@mui/material"
import { type IFilm } from "../../../shared/model"
import { Error, FilmCard, FilmCardSkeleton, NothingHere, PageLayout } from "../../../shared/ui"
import { useLocalStorage } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"
import { FAVORITES_KEY } from "../../../shared/config"

// Компонент страницы со списком избранных фильмов
export const Favorites: FC = () => {
    const [favorites, _] = useLocalStorage<number[]>(FAVORITES_KEY, [])
    const [favoriteFilms, setFavoriteFilms] = useState<IFilm[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchFavoriteFilms = async () => {
        if (favorites.length === 0) {
            setFavoriteFilms([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const promises = favorites.map(id => FilmsService.getById(String(id)))
            const responses = await Promise.all(promises)
            const films = responses.map(response => response.data)

            setFavoriteFilms(films)
        } catch (error) {
            setError('Не удалось загрузить избранные фильмы')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFavoriteFilms()
    }, [favorites])

    if (error) return <Error message={error} />

    return (
        <PageLayout>
            <Stack
                direction="row"
                spacing={4}
                alignItems="flex-start"
                sx={{ mt: 2, flex: 1 }}
            >
                <Stack spacing={2} flex={1}>
                    <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 3 }}>
                        Избранные фильмы
                    </Typography>

                    {loading ? (
                        [...Array(5)].map((_, i) => <FilmCardSkeleton key={i} />)
                    ) : favoriteFilms.length === 0 ? (
                        <NothingHere
                            title={'У вас пока нет избранных фильмов'}
                            subtitle={'Добавьте фильмы в избранное, и они появятся здесь'}
                        />
                    ) : (
                        favoriteFilms.map(film => (
                            <FilmCard key={film.id} item={film} />
                        ))
                    )}
                </Stack>
            </Stack>
        </PageLayout>
    )
}
