import type { IFilm } from "../../../shared/store"

export interface IFilms {
    docs: IFilm[],
    total: number | null,
    limit: number | null,
    page: number | null,
    pages: number | null
}

export interface IFilmsState {
    loading: boolean,
    error: string | null,
    films: IFilms | null
}
