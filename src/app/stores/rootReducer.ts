import { combineReducers } from "redux"
import { filmsReducer } from "../../entities/films"
// import { filterReducer } from "../../features/filter"

// Создание корневого редьюсера Redux на основе всех редьюсеров
export const rootReducer = combineReducers({
    // filter: filterReducer,
    films: filmsReducer
})