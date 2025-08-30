import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_ESTUDIANTES = `${API_URL}/estudiantes`;

export const consultarEstudiantes = async () => {
    try {
        const response = await axios.get(API_ESTUDIANTES);
        return response.data;
    } catch (error) {
        console.error("Error al obtener estudiantes:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Error al obtener estudiantes");
    }
};


export const registrarEstudiante = async (estudiante) => {
    try {
        const response = await axios.post(API_ESTUDIANTES, estudiante);
        return response.data;
    } catch (error) {
        console.error(
            "Error al crear estudiante:",
            error.response?.data?.error || error.message
        );
        throw new Error(error.response?.data?.error || "Error al crear estudiante");
    }
}

