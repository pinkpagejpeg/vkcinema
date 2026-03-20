import { type FC, useEffect, useRef } from "react"
import { Container, Stack, Box, Typography, CircularProgress } from "@mui/material"
import { FilterComponent } from "./Filters"
import { useFilms } from "./useFilms"
import { Error, Footer, Header, FilmCard, FilmCardSkeleton } from "../../../shared/ui"

// Компонент страницы со списком всех фильмов
export const Collection: FC = () => {
    const { films, loading, loadingMore, error, hasMore, loadMore } = useFilms()
    const loaderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!loaderRef.current || loading) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    loadMore()
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        )

        observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [loading, hasMore, loadingMore, loadMore])

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
                    <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
                        Список фильмов
                    </Typography>

                    {loading ? (
                        [...Array(5)].map((_, i) => <FilmCardSkeleton key={i} />)
                    ) : !films.length ? (
                        <Typography color="text.secondary">Фильмы не найдены</Typography>
                    ) : (
                        <>
                            {films.map(film => (
                                <FilmCard key={film.id} item={film} />
                            ))}

                            {hasMore && (
                                <Box ref={loaderRef} sx={{ py: 4, textAlign: 'center' }}>
                                    {loadingMore && <CircularProgress size={32} />}
                                </Box>
                            )}
                        </>
                    )}
                </Stack>
            </Stack>

            <Footer />
        </Container>
    )
}