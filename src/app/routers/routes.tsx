import { type RouteObject, Navigate } from "react-router-dom"
import { FilmCollection } from "../../pages/collection"
import { FilmInfo } from "../../pages/info"
import { FilmFavorites } from "../../pages/favorites"
import { FILM_FAVORITES_ROUTE, FILM_ITEM_ROUTE, FILM_LIST_ROUTE } from "../../shared/config"

// Массив маршрутов приложения
export const publicRoutes: RouteObject[] = [
    // Страница со списком всех фильмов
    {
        path: FILM_LIST_ROUTE,
        element: <FilmCollection />
    },

    // Страница фильма
    {
        path: FILM_ITEM_ROUTE + '/:id',
        element: <FilmInfo />
    },

    // Страница со списком избранных фильмов
    {
        path: FILM_FAVORITES_ROUTE,
        element: <FilmFavorites />
    },
    
    // Перенаправление на страницу со списком всех фильмов для неизвестных маршрутов
    {
        path: '*',
        element: <Navigate to={ FILM_LIST_ROUTE } replace /> 
    },
]