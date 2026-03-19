import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

export function useFilter() {
    const [searchParams, setSearchParams] = useSearchParams()

    // Инициализация рейтинга из URL
    const [rating, setRating] = useState<[number, number]>(() => {
        const rating = searchParams.get("rating")?.split("-").map(Number) as [number, number]
        return rating || [0, 10]
    })

    // Инициализация годов из URL
    const [years, setYears] = useState<[number, number]>(() => {
        const years = searchParams.get("years")?.split("-").map(Number) as [number, number]
        return years || [1990, new Date().getFullYear()]
    })

    // Получение жанров из URL
    const genres = searchParams.get("genres")?.split(",") || []

    const debouncedRating = useDebounce(rating, 500)
    const debouncedYears = useDebounce(years, 500)

    // Обновление URL при изменении рейтинга с дебаунсом
    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)

        newParams.set("rating", `${debouncedRating[0]}-${debouncedRating[1]}`)
        setSearchParams(newParams, { replace: true })
    }, [debouncedRating])

    // Обновление URL при изменении годов с дебаунсом
    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)

        newParams.set("years", `${debouncedYears[0]}-${debouncedYears[1]}`)
        setSearchParams(newParams, { replace: true })
    }, [debouncedYears])

    // Обновление рейтинга
    const setRatingRange = (newRating: [number, number]) => {
        setRating(newRating)
    }

    // Обновление годов
    const setYearRange = (newYears: [number, number]) => {
        setYears(newYears)
    }

    // Обновление жанров
    const toggleGenre = (genre: string) => {
        const newParams = new URLSearchParams(searchParams)
        const currentGenres = searchParams.get("genres")?.split(",") || []
        
        if (currentGenres.includes(genre)) {
            const filtered = currentGenres.filter(g => g !== genre)

            if (filtered.length) {
                newParams.set("genres", filtered.join(","))
            } else {
                newParams.delete("genres")
            }
        } else {
            newParams.set("genres", [...currentGenres, genre].join(","))
        }
        
        setSearchParams(newParams, { replace: true }) 
    }

    return {
        ratingRange: rating,
        yearRange: years,
        currentGenres: genres,
        setRatingRange,
        setYearRange,
        toggleGenre
    }
}