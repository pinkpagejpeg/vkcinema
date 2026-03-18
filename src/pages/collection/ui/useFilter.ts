import { useSearchParams } from "react-router-dom"

export function useFilter() {
    const [searchParams, setSearchParams] = useSearchParams()

    const ratingFromUrl = searchParams.get("rating")?.split("-").map(Number) as [number, number] || [0, 10]
    const yearsFromUrl = searchParams.get("years")?.split("-").map(Number) as [number, number] || [1990, new Date().getFullYear()]
    const genresFromUrl = searchParams.get("genres")?.split(",") || []

    const setRatingRange = (newRating: [number, number]) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("rating", `${newRating[0]}-${newRating[1]}`)
        setSearchParams(newParams, { replace: true })
    }

    const setYearRange = (newYears: [number, number]) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("years", `${newYears[0]}-${newYears[1]}`)
        setSearchParams(newParams, { replace: true })
    }

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
        ratingRange: ratingFromUrl,
        yearRange: yearsFromUrl,
        currentGenres: genresFromUrl,
        setRatingRange,
        setYearRange,
        toggleGenre
    }
}