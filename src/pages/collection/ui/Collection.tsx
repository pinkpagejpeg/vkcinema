import { type FC, useEffect, useRef, useCallback } from "react"
import { Stack, Box, Typography, CircularProgress } from "@mui/material"
import { FilterComponent } from "./Filters"
import { useFilms } from "../model"
import { Error, FilmCard, FilmCardSkeleton, NothingHere, PageLayout } from "../../../shared/ui"

// Компонент страницы со списком всех фильмов
export const Collection: FC = () => {
    const { films, loading, loadingMore, error, hasMore, loadMore } = useFilms()
    const loaderRef = useRef<HTMLDivElement>(null)

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
            loadMore()
        }
    }, [hasMore, loadingMore, loadMore])

    useEffect(() => {
        if (!loaderRef.current || loading) return

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: '200px'
        })

        observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [loading, handleObserver])

    if (error) return <Error message={error} />

    return (
        <PageLayout>
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

                    {loading ? (
                        [...Array(5)].map((_, i) => <FilmCardSkeleton key={i} />)
                    ) : !films.length ? (
                        <NothingHere
                            title={'Фильмы не найдены'}
                            subtitle={'Попробуйте перезагрузить страницу или повторить позже'}
                        />
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
        </PageLayout>
    )
}