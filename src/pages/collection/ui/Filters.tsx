import { type FC, useEffect, useState, useMemo, useCallback } from "react"
import {
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Slider,
  Button,
  Paper
} from "@mui/material"
import { useFilter } from "../model"
import { FiltersSkeleton } from "./FiltersSkeleton"
import { useFetching } from "../../../shared/lib"
import { FilmsService } from "../../../shared/api"
import type { IFilmGenres } from "../../../shared/model"

export const FilterComponent: FC = () => {
  const [allGenres, setAllGenres] = useState<IFilmGenres[]>([])
  const {
    ratingRange,
    yearRange,
    currentGenres,
    setRatingRange,
    setYearRange,
    toggleGenre,
    clearFilters
  } = useFilter()

  const [fetchGenres, loading] = useFetching(async () => {
    const { data } = await FilmsService.getGenres()
    setAllGenres(data)
  })

  useEffect(() => {
    fetchGenres()
  }, [])

  const genreOptions = useMemo(() => {
    return allGenres
      .filter((genre): genre is IFilmGenres & { name: string } =>
        genre.name !== null && genre.name !== undefined
      )
      .map(genre => ({
        label: genre.name,
        id: genre.name
      }))
  }, [allGenres])

  const selectedOptions = useMemo(() => {
    return genreOptions.filter(option => currentGenres.includes(option.label))
  }, [genreOptions, currentGenres])

  const handleGenreChange = useCallback((_: any, newValue: typeof genreOptions) => {
    const newGenres = newValue.map(option => option.label)
    const added = newGenres.filter(v => !currentGenres.includes(v))
    const removed = currentGenres.filter(v => !newGenres.includes(v))

    added.forEach(genre => toggleGenre(genre))
    removed.forEach(genre => toggleGenre(genre))
  }, [currentGenres, toggleGenre])

  if (loading) {
    return <FiltersSkeleton />
  }

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Фильтры</Typography>
            <Button
              size="small"
              onClick={clearFilters}
              sx={{ textTransform: 'none' }}
            >
              Сбросить все
            </Button>
        </Stack>

        <Stack spacing={1} sx={{ width: 340 }}>
          <Typography variant="subtitle2">Жанры</Typography>
          <Autocomplete
            multiple
            size="small"
            options={genreOptions}
            value={selectedOptions}
            onChange={handleGenreChange}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.id}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props
              return (
                <li key={key} {...optionProps}>
                  {option.label}
                </li>
              )
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Жанры"
                size="small"
              />
            )}
            limitTags={2}
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle2">
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
          <Typography variant="subtitle2">
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
    </Paper>
  )
}