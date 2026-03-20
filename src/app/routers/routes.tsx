import { type RouteObject, Navigate } from "react-router-dom"
import { Collection } from "../../pages/collection"
import { Info } from "../../pages/info"
import { Favorites } from "../../pages/favorites"
import { Compare } from "../../pages/compare"
import {
    FILM_COMPARE_ROUTE,
    FILM_FAVORITES_ROUTE,
    FILM_ITEM_ROUTE,
    FILM_LIST_ROUTE
} from "../../shared/config"

// Массив маршрутов приложения
export const publicRoutes: RouteObject[] = [
    // Страница со списком всех фильмов
    {
        path: FILM_LIST_ROUTE,
        element: <Collection />
    },

    // Страница фильма
    {
        path: FILM_ITEM_ROUTE + '/:id',
        element: <Info />
    },

    // Страница со списком избранных фильмов
    {
        path: FILM_FAVORITES_ROUTE,
        element: <Favorites />
    },

    // Страница со сравнением фильмов
    {
        path: FILM_COMPARE_ROUTE,
        element: <Compare />
    },

    // Перенаправление на страницу со списком всех фильмов для неизвестных маршрутов
    {
        path: '*',
        element: <Navigate to={FILM_LIST_ROUTE} replace />
    },
]