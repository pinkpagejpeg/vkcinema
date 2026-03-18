import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IFilms } from '../model/types'
import { FilmsService } from '../../../shared/api'

// Асинхронный redux thunk для получения списка фильмов
export const fetchFilms = createAsyncThunk<IFilms, { year?: string, rating?: string, genres?: string }, { rejectValue: string }>(
    "films/fetchFilms",
    async (arg, { rejectWithValue }) => {
        try {
            const { data } = await FilmsService.getAll(arg.year, arg.rating, arg.genres)
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)