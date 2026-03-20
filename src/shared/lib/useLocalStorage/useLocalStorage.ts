import { useState, useCallback, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`При получении значения ${key} из localStorage возникла ошибка:`, error)
            return initialValue
        }
    })

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            setStoredValue((prev) => {
                const newValue = value instanceof Function ? value(prev) : value
                localStorage.setItem(key, JSON.stringify(newValue))
                
                window.dispatchEvent(new StorageEvent('storage', {
                    key: key,
                    newValue: JSON.stringify(newValue),
                    oldValue: JSON.stringify(prev)
                }))
                
                return newValue
            })
        } catch (error) {
            console.error(`При получении значения ${key} из localStorage возникла ошибка:`, error)
        }
    }, [key])

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                try {
                    const newValue = JSON.parse(e.newValue)
                    setStoredValue(newValue)
                } catch {
                    setStoredValue(e.newValue as T)
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [key])

    return [storedValue, setValue] as const
}