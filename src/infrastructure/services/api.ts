import axios from "axios";
import { auth } from "./firebase";
import { VITE_BACKEND_API_URL } from '../config/env'

export const api = axios.create({
    baseURL: `${VITE_BACKEND_API_URL}`, // Cambia según tu backend
    headers: { "Content-Type": "application/json" }
});

// Interceptor para adjuntar el token solo si el usuario está autenticado
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
    (response) => response, // Retorna la respuesta normal
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized, logging out...");
            auth.signOut(); // Cierra sesión automáticamente si el token es inválido
        }
        return Promise.reject(error);
    }
);
