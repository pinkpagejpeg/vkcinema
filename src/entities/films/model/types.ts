export interface IFilm {
    id: number | null,
    name: string | null,
    alternativeName: string | null,
    enName: string | null,
    type: string | null,
    year: number | null,
    description?: string | null,
    ageRating: number | null,
    poster?: IFilmPosters | null,
    premiere: IFilmPremiere | null,
    rating: IFilmRating | null,
    movieLength: number | null,
    genres: IFilmGenres[] | null,
    countries: IFilmCountries[] | null,
}

export interface IFilms {
    docs: IFilm[],
    total: number | null,
    limit: number | null,
    page: number | null,
    pages: number | null
}

export interface IFilmPosters {
    url: string | null,
    previewUrl: string | null,
}

export interface IFilmPremiere {
    cinema: string
    world?: string
}

export interface IFilmRating {
    kp: number | null,
    imdb: number | null,
    tmdb: number | null
}

export interface IFilmGenres {
    name: string | null,
    slug: string
}

export interface IFilmCountries {
    name: string | null,
}

export interface ISeasonsInfo {
    number: number | null,
    episodesCount: number | null,
}

export interface IFilmsState {
    loading: boolean,
    error: string | null,
    films: IFilms | null,
    film: IFilm | null,
}
