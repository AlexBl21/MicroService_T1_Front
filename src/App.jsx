import { useState } from "react";
import EstudianteForm from "./components/EstudianteForm";
import EstudianteList from "./components/EstudianteList";
import "./App.css";

function App() {
  const [estudiantes, setEstudiantes] = useState([]);

  const registrarEstudiante = (nuevoEstudiante) => {
    setEstudiantes((prev) => [...prev, nuevoEstudiante]);
    alert("Estudiante registrado exitosamente!");
  };

  const eliminarEstudiante = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este estudiante?")
    ) {
      setEstudiantes((prev) =>
        prev.filter((estudiante) => estudiante.id !== id)
      );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Registro de Estudiantes</h1>
        <div className="header-stats">
          <span
            className="stat-item"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {/* Ícono SVG blanco de usuarios */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05C15.64 13.36 17 14.28 17 15.5V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            Total de Estudiantes: <strong>{estudiantes.length}</strong>
          </span>
        </div>
      </header>

      <main className="app-main">
        <div className="content-container">
          <section className="form-section">
            <EstudianteForm onRegistrarEstudiante={registrarEstudiante} />
          </section>

          <section className="list-section">
            <EstudianteList
              estudiantes={estudiantes}
              onEliminarEstudiante={eliminarEstudiante}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
