import type { FC } from "react"
import { Stack, Typography, Grid } from "@mui/material"
import type { IFilmRating } from "../../../shared/model"

interface InfoRatingProps {
    rating: IFilmRating | null
}

export const InfoRating: FC<InfoRatingProps> = ({ rating }) => {
    const hasRating = rating && (rating.kp !== 0 || rating.imdb !== 0)

    if (!hasRating) {
        return (
            <Stack spacing={1}>
                <Typography variant="h5">Рейтинг</Typography>
                <Typography color="text.secondary">
                    Недостаточно оценок, рейтинг формируется
                </Typography>
            </Stack>
        )
    }

    const ratings = [
        { label: 'Кинопоиск', value: rating?.kp, show: rating?.kp !== 0 },
        { label: 'IMDb', value: rating?.imdb, show: rating?.imdb !== 0 }
    ]

    return (
        <Stack spacing={1}>
            <Typography variant="h5">Рейтинг</Typography>
            {ratings.map((rating, index) => (
                rating.show && (
                    <Grid container spacing={2} key={index}>
                        <Grid size={{ xs: 4, sm: 3, md: 2 }}>
                            <Typography fontWeight={500}>{rating.label}</Typography>
                        </Grid>
                        <Grid size={{ xs: 8, sm: 9, md: 10 }}>
                            <Typography>{rating.value}</Typography>
                        </Grid>
                    </Grid>
                )
            ))}
        </Stack>
    )
}