import React, { useState } from "react";
import "./EstudianteList.css";

const EstudianteList = ({ estudiantes, onEliminarEstudiante }) => {
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Datos de ejemplo para mostrar cómo se verían las tarjetas
  const estudiantesEjemplo = [
    {
      id: "ejemplo1",
      nombre: "María",
      apellido: "González",
      fechaNacimiento: "1998-05-15",
      codigoEstudiante: "2024001",
      carrera: "Ingeniería en Sistemas",
      correo: "maria.gonzalez@universidad.edu",
      fechaRegistro: "15/01/2024",
    },
    {
      id: "ejemplo2",
      nombre: "Carlos",
      apellido: "Rodríguez",
      fechaNacimiento: "1999-08-22",
      codigoEstudiante: "2024002",
      carrera: "Medicina",
      correo: "carlos.rodriguez@universidad.edu",
      fechaRegistro: "16/01/2024",
    },
    {
      id: "ejemplo3",
      nombre: "Ana",
      apellido: "Martínez",
      fechaNacimiento: "1997-12-03",
      codigoEstudiante: "2024003",
      carrera: "Derecho",
      correo: "ana.martinez@universidad.edu",
      fechaRegistro: "17/01/2024",
    },
    {
      id: "ejemplo4",
      nombre: "Luis",
      apellido: "Hernández",
      fechaNacimiento: "2000-03-10",
      codigoEstudiante: "2024004",
      carrera: "Administración de Empresas",
      correo: "luis.hernandez@universidad.edu",
      fechaRegistro: "18/01/2024",
    },
  ];

  const verDetalles = (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEstudianteSeleccionado(null);
  };

  const renderizarTabla = (estudiantesData, esEjemplo = false) => (
    <div className="tabla-container">
      <table className="estudiantes-tabla">
        <thead>
          <tr>
            <th> Código</th>
            <th> Estudiante</th>
            <th> Ver más</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesData.map((estudiante) => (
            <tr key={estudiante.id} className={esEjemplo ? "fila-ejemplo" : ""}>
              <td className="codigo-estudiante">
                {estudiante.codigoEstudiante}
              </td>
              <td className="nombre-estudiante">
                {estudiante.nombre} {estudiante.apellido}
              </td>
              <td className="acciones">
                <button
                  className="btn-ver-mas"
                  onClick={() => verDetalles(estudiante)}
                  title="Ver detalles completos"
                >
                  👁️
                </button>
                {!esEjemplo && (
                  <button
                    className="btn-eliminar"
                    onClick={() => onEliminarEstudiante(estudiante.id)}
                    title="Eliminar estudiante"
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (estudiantes.length === 0) {
    return (
      <div className="estudiante-list">
        <div className="tabla-container">
          <h2>Lista de Estudiantes</h2>
          {renderizarTabla(estudiantesEjemplo, true)}
          <div className="no-estudiantes">No hay estudiantes registrados.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="estudiante-list">
      <div className="tabla-container">
        <h2>Lista de Estudiantes ({estudiantes.length})</h2>
        {renderizarTabla(estudiantes)}
      </div>

      {/* Modal para mostrar detalles completos */}
      {mostrarModal && estudianteSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-detalles" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>👤 Detalles del Estudiante</h3>
              <button className="btn-cerrar" onClick={cerrarModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detalle-grupo">
                <label>Nombre Completo:</label>
                <span>
                  {estudianteSeleccionado.nombre}{" "}
                  {estudianteSeleccionado.apellido}
                </span>
              </div>
              <div className="detalle-grupo">
                <label>Código de Estudiante:</label>
                <span>{estudianteSeleccionado.codigoEstudiante}</span>
              </div>
              <div className="detalle-grupo">
                <label>Carrera:</label>
                <span>{estudianteSeleccionado.carrera}</span>
              </div>
              <div className="detalle-grupo">
                <label>Fecha de Nacimiento:</label>
                <span>{estudianteSeleccionado.fechaNacimiento}</span>
              </div>
              <div className="detalle-grupo">
                <label>Correo Electrónico:</label>
                <span>{estudianteSeleccionado.correo}</span>
              </div>
              <div className="detalle-grupo">
                <label>Fecha de Registro:</label>
                <span>{estudianteSeleccionado.fechaRegistro}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-eliminar"
                onClick={() => onEliminarEstudiante(estudianteSeleccionado.id)}
              >
                🗑️ Eliminar Estudiante
              </button>
              <button className="btn-cerrar" onClick={cerrarModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstudianteList;
