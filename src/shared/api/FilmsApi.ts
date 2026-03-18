import { $host } from './http'

// Сервис для работы с API фильмов
export class FilmsService {
    // Получение списка всех фильмов
    static async getAll(year?: string, rating?: string, genres?: string) {
        const params: Record<string, string> = {
            "type": "movie",
            "year": "1990-2026"

        }

        if (year) {
            params.year = year
        }

        if (rating) {
            params["rating.kp"] = rating
        }

        if (genres) {
            params["genres.name"] = genres
        }

        const data = await $host.get(`/v1.5/movie`, { params })
        return data
    }

    // Получение фильма по ID
    static async getById(id: string) {
        const data = await $host.get(`/v1.4/movie/${id}`)
        return data
    }

    // Получение списка жанров
    static async getGenres() {
        const data = await $host.get("/v1/movie/possible-values-by-field", {
            params: { field: "genres.name" }
        })
        return data
    }
}