import { type FC } from "react"
import { Card, CardContent, Grid, Stack, Typography, Button, Chip } from "@mui/material"
import { CompareCardItem } from "./CompareCardItem"
import { type IFilm } from "../../../shared/model"
import { formatMovieLength } from "../../../shared/lib"

interface CompareCardProps {
    film: IFilm
    onRemove: (id: string) => void
}

export const CompareCard: FC<CompareCardProps> = ({ film, onRemove }) => {
    return (
        <Grid size={6}>
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5">
                                {film.name || film.alternativeName}
                            </Typography>
                            <Button
                                size="small"
                                color="error"
                                onClick={() => onRemove(String(film.id))}
                            >
                                Удалить
                            </Button>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle1" fontWeight={500}>
                                Параметры
                            </Typography>

                            <Grid container spacing={2}>
                                <CompareCardItem label="Год" value={film.year || "—"} />
                                <CompareCardItem label="Рейтинг KP" value={film.rating?.kp || "—"} />
                                <CompareCardItem label="Рейтинг IMDb" value={film.rating?.imdb || "—"} />
                                <CompareCardItem label="Длительность" value={formatMovieLength(film.movieLength)} />

                                <Grid size={4}>
                                    <Typography variant="body2" color="text.secondary">
                                        Жанры
                                    </Typography>
                                </Grid>
                                <Grid size={8}>
                                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                        {film.genres?.map(g => (
                                            <Chip
                                                key={g.name}
                                                label={g.name}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}