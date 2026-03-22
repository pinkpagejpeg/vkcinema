import type { FC } from "react"
import { Stack, Typography, Grid } from "@mui/material"
import { formatMovieLength } from "../../../shared/lib"
import type { IFilmGenres, IFilmCountries } from "../../../shared/model"

interface InfoDetailsProps {
    year: number | null,
    genres: IFilmGenres[] | null,
    countries: IFilmCountries[] | null,
    ageRating: number | null,
    movieLength: number | null,
}

export const InfoDetails: FC<InfoDetailsProps> = ({
    year,
    genres,
    countries,
    ageRating,
    movieLength
}) => {
    const details = [
        { label: 'Год производства', value: year || "—" },
        { label: 'Страна', value: countries?.map((c) => c.name).join(", ") || "—" },
        { label: 'Жанр', value: genres?.map((g) => g.name).join(", ") || "—" },
        { label: 'Возрастное ограничение', value: `${ageRating || 0}+` },
        { label: 'Длительность', value: formatMovieLength(movieLength) }
    ]

    return (
        <Stack spacing={1}>
            <Typography variant="h5">О фильме</Typography>
            <Grid container spacing={4}>
                <Grid size={{ xs: 5, sm: 4, md: 3 }}>
                    <Stack spacing={0.5}>
                        {details.map((detail, index) => (
                            <Typography key={index} fontWeight={500}>
                                {detail.label}
                            </Typography>
                        ))}
                    </Stack>
                </Grid>

                <Grid size={{ xs: 7, sm: 8, md: 9 }}>
                    <Stack spacing={0.5}>
                        {details.map((detail, index) => (
                            <Typography key={index} sx={{ wordBreak: 'break-word' }}>
                                {detail.value}
                            </Typography>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    )
}