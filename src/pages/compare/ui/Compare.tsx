import { useEffect, useState, type FC } from "react"
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { CompareCard } from "./CompareCard"
import { CompareCardSkeleton } from "./CompareCardSkeleton"
import { Error, NothingHere, PageLayout } from "../../../shared/ui"
import type { IFilm } from "../../../shared/model"
import { FilmsService } from "../../../shared/api"
import { useLocalStorage } from "../../../shared/lib"
import { COMPARE_KEY } from "../../../shared/config"

const compareParams = [
    { key: 'title', label: 'Название' },
    { key: 'year', label: 'Год' },
    { key: 'ageRating', label: 'Возрастной рейтинг' },
    { key: 'rating', label: 'Рейтинг' },
    { key: 'genres', label: 'Жанры' },
    { key: 'duration', label: 'Длительность' }
] as const

// Компонент страницы со сравнением фильмов
export const Compare: FC = () => {
    const [compares, setCompares] = useLocalStorage<number[]>(COMPARE_KEY, [])
    const [compareFilms, setCompareFilms] = useState<IFilm[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCompareFilms = async () => {
        if (compares.length === 0) {
            setCompareFilms([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const promises = compares.map(id => FilmsService.getById(String(id)))
            const responses = await Promise.all(promises)
            const films = responses.map(response => response.data)

            setCompareFilms(films)
        } catch (error) {
            setError('Не удалось загрузить избранные фильмы')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCompareFilms()
    }, [compares])

    const handleRemove = (id: number | null) => {
        if (!id) return

        setCompares((prev) => {
            return prev.includes(id)
                ? prev.filter(i => i !== id)
                : prev
        })
    }

    if (error) return <Error message={error} />

    return (
        <PageLayout>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 3 }}>Сравнение фильмов</Typography>
                {compares.length > 0 && (
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setCompares([])}
                    >
                        Очистить все
                    </Button>
                )}
            </Stack>

            <Grid container spacing={4}>
                {loading ? (
                    [...Array(2)].map((_, i) => <CompareCardSkeleton key={i} />)
                ) : compareFilms.length === 0 ? (
                    <NothingHere
                        title={'У вас пока нет фильмов для сравнения'}
                        subtitle={'Добавьте фильмы в сравнение, и они появятся здесь'}
                    />
                ) : (
                    <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', width: '80%' }}>
                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 3 }}>
                                    <Stack spacing={1} sx={{ height: '100%', justifyContent: 'space-between' }}>
                                        <Box sx={{ height: 300 }} />
                                        {compareParams.map((param) => (
                                            <Typography key={param.key} fontWeight={400}>
                                                {param.label}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Grid>

                                {compareFilms.map((film) => (
                                    <Grid size={{ xs: 9 / compareFilms.length }} key={film.id}>
                                        <CompareCard film={film} onRemove={handleRemove} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>
                )}
            </Grid>
        </PageLayout>
    )
}
