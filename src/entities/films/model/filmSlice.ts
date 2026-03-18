import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type IFilm, type IFilms, type IFilmsState } from "./types"
import { fetchFilmById, fetchFilms } from "../api"
import { createPendingHandler, createRejectedHandler } from "../../../shared/store"

// Начальное состояние
const initialState: IFilmsState = {
    loading: false,
    error: null,
    films: null,
    film: null
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

            .addCase(fetchFilmById.pending, createPendingHandler<IFilmsState>())
            .addCase(fetchFilmById.fulfilled, (state: IFilmsState, action: PayloadAction<IFilm>) => {
                state.loading = false
                state.film = action.payload
            })
            .addCase(fetchFilmById.rejected, createRejectedHandler<IFilmsState>())
    }
})

export default filmSlice.reducer