import { type RouteObject, Navigate } from "react-router-dom"
import { FILM_ITEM_ROUTE, FILM_LIST_ROUTE } from "../../shared/config"
import { FilmCollection } from "../../pages/collection"
import { FilmInfo } from "../../pages/info"

// Массив маршрутов приложения
export const publicRoutes: RouteObject[] = [
    // Страница со списком всех проектов (досок)
    {
        path: FILM_LIST_ROUTE,
        element: <FilmCollection />
    },

    // Страница конкретного проекта (доски) по ID
    {
        path: FILM_ITEM_ROUTE + '/:id',
        element: <FilmInfo />
    },
    
    // Перенаправление на страницу со списком всех задач для неизвестных маршрутов
    {
        path: '*',
        element: <Navigate to={ FILM_LIST_ROUTE } replace /> 
    },
]