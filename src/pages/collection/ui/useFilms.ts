import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { FilmsService } from "../../../shared/api"
import { useFetching } from "../../../shared/lib"
import type { IFilm } from "../../../shared/store"

const limit = 50

export function useFilms() {
    const [searchParams] = useSearchParams()
    const [films, setFilms] = useState<IFilm[]>([])
    const [next, setNext] = useState<string | null>(null)

    const getFilterParams = useCallback(() => {
        const rating = searchParams.get("rating") || '0-10'
        const years = searchParams.get("years") || `1990-${new Date().getFullYear()}`
        const genres = searchParams.get("genres") || ''
        
        return {
            year: years,
            rating: rating,
            genres: genres
        }
    }, [searchParams])

    // Запрос фильмов
    const fetchFilmsRequest = useCallback(async (nextParam?: string | null) => {
        const { year, rating, genres } = getFilterParams()
        const { data } = await FilmsService.getAll(
            limit,
            nextParam,
            year,
            rating,
            genres
        )
        return data
    }, [getFilterParams, limit])

    // Первая загрузка загрузка
    const [fetchFilms, loading, error] = useFetching(async () => {
        const data = await fetchFilmsRequest()

        setFilms(data.docs)
        setNext(data.next || null)
    })

    // Подгрузка фильмов
    const [loadMore, loadingMore] = useFetching(async () => {
        if (!next) return

        const data = await fetchFilmsRequest(next)

        setFilms(prev => [...prev, ...data.docs])
        setNext(data.next || null)
    })

    // Перезагрузка при изменении фильтров
    useEffect(() => {
        fetchFilms()
    }, [searchParams])

    return {
        films,
        loading,
        loadingMore,
        error,
        hasMore: !!next,
        loadMore
    }
}