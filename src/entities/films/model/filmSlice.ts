import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type IFilms, type IFilmsState } from "./types"
import { fetchFilms } from "../api"
import { createPendingHandler, createRejectedHandler } from "../../../shared/store"

// Начальное состояние
const initialState: IFilmsState = {
    loading: false,
    error: null,
    films: null
}

// Redux slice для фильмов
const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка загрузки фильмов
            .addCase(fetchFilms.pending, createPendingHandler<IFilmsState>())
            // Обработка успешной подгрузки фильмов
            .addCase(fetchFilms.fulfilled, (state: IFilmsState, action: PayloadAction<IFilms>) => {
                state.loading = false
                state.films = action.payload
            })
            // Обработка возникновения ошибки при загрузке фильмов
            .addCase(fetchFilms.rejected, createRejectedHandler<IFilmsState>())
    }
})

export default filmSlice.reducer