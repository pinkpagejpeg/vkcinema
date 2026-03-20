import { useCallback, useEffect, useState, type FC } from "react"
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { CompareCard } from "./CompareCard"
import { CompareCardSkeleton } from "./CompareCardSkeleton"
import { useCompare } from "../../../shared/lib"
import { Footer, Header, Error } from "../../../shared/ui"
import type { IFilm } from "../../../shared/model"
import { FilmsService } from "../../../shared/api"

export const Compare: FC = () => {
    const { compares, removeFromCompare, clearCompare } = useCompare()
    const [compareFilms, setCompareFilms] = useState<IFilm[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCompareFilms = useCallback(async () => {
        if (compares.length === 0) {
            setCompareFilms([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const promises = compares.map(id => FilmsService.getById(id))
            const responses = await Promise.all(promises)
            const films = responses.map(response => response.data)

            setCompareFilms(films)
        } catch (error) {
            setError('Не удалось загрузить избранные фильмы')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [compares])

    useEffect(() => {
        fetchCompareFilms()
    }, [compares, fetchCompareFilms])

    if (error) return <Error message={error} />


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <Container sx={{ flex: 1, py: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h4">Сравнение фильмов</Typography>
                    {compares.length > 0 && (
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={clearCompare}
                        >
                            Очистить все
                        </Button>
                    )}
                </Stack>

                <Grid container spacing={4}>
                    {loading ? (
                        [...Array(2)].map((_, i) => <CompareCardSkeleton key={i} />)
                    ) : compareFilms.length === 0 ? (
                        <Container sx={{ flex: 1, py: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                У вас пока нет фильмов для сравнения
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Добавьте фильмы в сравнение, и они появятся здесь
                            </Typography>
                        </Container>
                    ) : (
                        compareFilms.map((film) => (
                            <CompareCard
                                key={film.id}
                                film={film}
                                onRemove={removeFromCompare}
                            />
                        )))}
                </Grid>
            </Container>

            <Footer />
        </Box>
    )
}
