import { useState, useEffect } from "react";
import EstudianteForm from "./components/EstudianteForm";
import EstudianteList from "./components/EstudianteList";
import { consultarEstudiantes } from "./api/EstudianteApi";
import ModalGlobal from "./components/ModalGlobal";
import "./App.css";

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalMensaje, setModalMensaje] = useState("");
  const [modalOnConfirm, setModalOnConfirm] = useState(null);

  const abrirModal = (titulo, mensaje, onConfirm) => {
    setModalTitulo(titulo);
    setModalMensaje(mensaje);
    setModalOnConfirm(() => onConfirm || null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setModalTitulo("");
    setModalMensaje("");
    setModalOnConfirm(null);
  };

  // Función para cargar estudiantes desde la API
  const cargarEstudiantes = async () => {
    try {
      setCargando(true);
      const data = await consultarEstudiantes();
      const estudiantesFormateados = data.map((est) => ({
        nombre: est.nombre,
        apellido: est.apellido,
        fechaNacimiento: est.fecha_nacimiento,
        codigoEstudiante: est.codigo,
        carrera: est.carrera,
        correo: est.correo,
        documento: est.documento,
      }));
      setEstudiantes(estudiantesFormateados);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    } finally {
      setCargando(false);
    }
  };

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const registrarEstudiante = (nuevo) => {
    // Acepta tanto formato API (snake_case) como UI (camelCase de la tabla)
    const estudianteFormateado = {
      nombre: nuevo.nombre,
      apellido: nuevo.apellido,
      fechaNacimiento: nuevo.fecha_nacimiento || nuevo.fechaNacimiento,
      codigoEstudiante: nuevo.codigo || nuevo.codigoEstudiante,
      carrera: nuevo.carrera,
      correo: nuevo.correo,
      documento: nuevo.documento,
    };

    setEstudiantes((prev) => [...prev, estudianteFormateado]);
  };

  const manejarErrorRegistro = (error) => {
    // Normalizar mensaje para código duplicado
    const mensajeError = String(error?.message || "Error al registrar estudiante");
    const esDuplicado = /duplicate|duplicado|unique|validation/i.test(mensajeError);

    if (esDuplicado) {
      abrirModal(
        "No se pudo registrar",
        "El código de estudiante ya existe. Usa un código diferente."
      );
    } else {
      abrirModal("Error", mensajeError);
    }
  };

  const solicitarEliminarEstudiante = (codigoEstudiante) => {
    abrirModal(
      "Eliminar estudiante",
      `¿Seguro que deseas eliminar al estudiante con código ${codigoEstudiante}?`,
      () => {
        setEstudiantes((prev) =>
          prev.filter((est) => est.codigoEstudiante !== codigoEstudiante)
        );
        cerrarModal();
      }
    );
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
            <EstudianteForm onRegistrarEstudiante={registrarEstudiante} onErrorRegistro={manejarErrorRegistro} />
          </section>

          <section className="list-section">
            <EstudianteList
              estudiantes={estudiantes}
              onEliminarEstudiante={solicitarEliminarEstudiante}
              cargando={cargando}
            />
          </section>
        </div>
      </main>

      <ModalGlobal
        mostrar={mostrarModal}
        titulo={modalTitulo}
        mensaje={modalMensaje}
        onClose={cerrarModal}
        onConfirm={modalOnConfirm}
      />
    </div>
  );
}

export default App;
