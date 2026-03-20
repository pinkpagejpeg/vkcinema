import { useEffect, useState } from "react"

const MAX_COMPARE = 2
const COMPARE_KEY = 'compare'

const getInitialCompareIds = (): string[] => {
    try {
        const saved = localStorage.getItem(COMPARE_KEY)
        return saved ? JSON.parse(saved) : []
    } catch (error) {
        console.error('Failed to read compare from localStorage:', error)
        return []
    }
}

export function useCompare() {
    const [compareIds, setCompareIds] = useState<string[]>(getInitialCompareIds)

    useEffect(() => {
        try {
            localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds))
        } catch (error) {
            console.error('Failed to save compare to localStorage:', error)
        }
    }, [compareIds])

    const addToCompare = (id: string) => {
        setCompareIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(id => id !== id)
            }
            
            if (prev.length === MAX_COMPARE) {
                const newIds: string[] = [prev[1], id]
                return newIds
            }
            
            return [...prev, id]
        })
    }

    const removeFromCompare = (filmId: string) => {
        if (filmId) {
            setCompareIds(prev => prev.filter(id => id !== filmId))
        }
    }

    const clearCompare = () => {
        setCompareIds([])
    }

    return {
        compares: compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
    }
}