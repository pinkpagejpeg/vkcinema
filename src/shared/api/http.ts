import axios from 'axios'

// Создание экземпляра axios с базовым URL
const $host = axios.create({
    baseURL: 'https://api.poiskkino.dev',
    headers: {
        accept: "application/json",
        "X-API-KEY": import.meta.env.VITE_TOKEN,
    },
})

export { $host }