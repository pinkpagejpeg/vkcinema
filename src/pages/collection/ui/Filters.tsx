import { type FC, useEffect, useState } from "react"
import {
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider
} from "@mui/material"
import { useFilter } from "./useFilter"
import { useFetching } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"
import type { IFilmGenres } from "../../../shared/model"
import { FiltersSkeleton } from "./FiltersSkeleton"

export const FilterComponent: FC = () => {
  const [allGenres, setAllGenres] = useState<IFilmGenres[]>([])
  const { ratingRange, yearRange, currentGenres, setRatingRange, setYearRange, toggleGenre } = useFilter()

  const [fetchGenres, loading] = useFetching(async () => {
    const { data } = await FilmsService.getGenres()
    setAllGenres(data)
  })

  useEffect(() => {
    fetchGenres()
  }, [])

  if (loading) {
    return <FiltersSkeleton />
  }

  return (
    <Stack spacing={4} mt={4}>
      <Stack spacing={1}>
        <Typography variant="h6">Жанры</Typography>
        <FormGroup>
          {allGenres?.map((genre) => (
            <FormControlLabel
              key={genre.slug}
              control={
                <Checkbox
                  checked={currentGenres.includes(genre.slug)}
                  onChange={() => toggleGenre(genre.slug)}
                />
              }
              label={genre.name}
            />
          ))}
        </FormGroup>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">
          Рейтинг: {ratingRange[0].toFixed(1)} — {ratingRange[1].toFixed(1)}
        </Typography>
        <Slider
          value={ratingRange}
          onChange={(_, value) => setRatingRange(value as [number, number])}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={0.1}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">
          Годы: {yearRange[0]} — {yearRange[1]}
        </Typography>
        <Slider
          value={yearRange}
          onChange={(_, value) => setYearRange(value as [number, number])}
          valueLabelDisplay="auto"
          min={1990}
          max={new Date().getFullYear()}
        />
      </Stack>
    </Stack>
  )
}