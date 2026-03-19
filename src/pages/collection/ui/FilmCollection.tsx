import { type FC, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Container, Stack, Box, List, Typography } from "@mui/material"
import { fetchFilms } from "../../../entities/films"
import { FilterComponent } from "./FilterComponent"
import { useAppDispatch, useTypedSelector } from "../../../shared/store"
import { Loading, Error, Footer, Header, FilmCard } from "../../../shared/ui"

// Компонент страницы со списком всех фильмов
export const FilmCollection: FC = () => {
    const dispatch = useAppDispatch()
    const { films, loading, error } = useTypedSelector((state) => state.films)
    const [searchParams] = useSearchParams()
    // const { filmsCurrentPage, filmsCount } = useTypedSelector((state) => state.pagination)

    useEffect(() => {
        const rating = searchParams.get("rating")?.split("-").map(Number) as [number, number] || [0, 10]
        const years = searchParams.get("years")?.split("-").map(Number) as [number, number] || [1990, new Date().getFullYear()]
        const genres = searchParams.get("genres")?.split(",") || []

        dispatch(fetchFilms({
            year: `${years[0]}-${years[1]}`,
            rating: `${rating[0]}-${rating[1]}`,
            genres: genres.join(",")
        }))
    }, [searchParams, dispatch])

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
                <Box sx={{ minWidth: 250 }}>
                    <FilterComponent />
                </Box>

                <Stack spacing={2} flex={1}>
                    <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 3 }}>
                        Список фильмов
                    </Typography>

                    {films?.docs.length === 0 ? (
                        <Box sx={{ textAlign: 'start' }}>
                            <Typography variant="h6" color="text.secondary">
                                Фильмы не найдены
                            </Typography>
                        </Box>
                    ) : (
                        <List disablePadding>
                            {films?.docs && films.docs.map((item) => (
                                <FilmCard key={item.id} item={item} />
                            ))}
                        </List>
                    )}

                    {/* <PaginationComponent type="films" /> */}
                </Stack>
            </Stack>

            <Footer />
        </Container>
    )
}
