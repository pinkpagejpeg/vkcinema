import { type FC } from "react"
import { NavLink } from "react-router-dom"
import { Card, CardContent, Stack, CardMedia, Typography, Chip, Divider, Button } from "@mui/material"
import { FILM_ITEM_ROUTE } from "../../../shared/config"
import type { IFilm } from "../../../entities/films"
import { noPhotoIcon } from "../../../shared/assets"

interface FilmCardProps {
    item: IFilm;
  }

export const FilmCard: FC<FilmCardProps> = ({ item }) => {
    return (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start" flexWrap="nowrap">
                    <CardMedia
                        component="img"
                        image={item?.poster?.url ?? noPhotoIcon}
                        alt={item.name ?? ''}
                        sx={{ width: 160, height: 260, borderRadius: 1 }}
                    />

                    <Stack spacing={1} flex={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Stack>
                                <Typography variant="h6">{item.name || item.alternativeName}</Typography>
                                {item.enName && (
                                    <Typography variant="body2" color="text.secondary">
                                        {item.enName}
                                    </Typography>
                                )}
                            </Stack>
                            <Chip label={`${item.ageRating || 0}+`} color="error" size="small" />
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            {item.movieLength ? (
                                <>
                                    <Typography variant="body2">
                                        {item.movieLength >= 60
                                            ? `${Math.floor(item.movieLength / 60)} ч. ${item.movieLength % 60} мин.`
                                            : `${item.movieLength} мин.`}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                </>
                            ) : null}

                            {item.year ? (
                                <>
                                    <Typography variant="body2">{item.year}</Typography>
                                    <Divider orientation="vertical" flexItem />
                                </>
                            ) : null}

                            <Typography variant="body2">
                                {item.countries?.map((country) => country.name).join(", ")}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography variant="body2">
                                {item.genres?.map((genre) => genre.name).join(", ")}
                            </Typography>
                        </Stack>

                        <NavLink to={`${FILM_ITEM_ROUTE}/${item.id}`} style={{ textDecoration: "none" }}>
                            <Button variant="contained">Подробнее</Button>
                        </NavLink>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}