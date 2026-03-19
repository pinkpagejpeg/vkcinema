import { useEffect, useState } from "react"

const FAVORITES_KEY = 'favorites'

const getInitialFavorites = (): string[] => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    return saved ? JSON.parse(saved) : []
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(getInitialFavorites)

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (id: string) => {
        setFavorites(prev => 
            prev.includes(id) 
                ? prev.filter(favId => favId !== id)
                : [...prev, id]
        )
    }

    const isFavorite = (id: string) => favorites.includes(id)

    return {
        favorites,
        toggleFavorite,
        isFavorite
    }
}
