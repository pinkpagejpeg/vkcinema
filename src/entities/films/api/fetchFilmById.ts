import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IFilm } from '../model/types'
import { FilmsService } from '../../../shared/api'

// Асинхронный redux thunk для получения фильма по ID
export const fetchFilmById = createAsyncThunk<IFilm, string, { rejectValue: string }>(
    "films/fetchFilmById",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await FilmsService.getById(id)
            return data
        } catch (error: unknown) {
            return rejectWithValue((error instanceof Error) ? error.message : 'Неизвестная ошибка')
        }
    }
)