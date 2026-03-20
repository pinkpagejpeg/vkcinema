export const formatMovieLength = (length?: number | null) => {
    if (!length || length === 0) return "—"
    
    return length >= 60
        ? `${Math.floor(length / 60)} ч. ${length % 60} мин.`
        : `${length} мин.`
}