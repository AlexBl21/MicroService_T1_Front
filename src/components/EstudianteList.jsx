import React, { useState } from "react";
import "./EstudianteList.css";

const EstudianteList = ({ estudiantes, onEliminarEstudiante, cargando }) => {
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const verDetalles = (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEstudianteSeleccionado(null);
  };

  const renderizarTabla = (estudiantes) => (
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
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.codigoEstudiante}>
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
                  <i
                    className="fa-solid fa-eye"
                    style={{ fontSize: "1.1rem" }}
                  ></i>
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => onEliminarEstudiante(estudiante)}
                  title="Eliminar estudiante"
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ fontSize: "1.1rem" }}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Modal simplificado para testing
  const ModalDetalles = () => {
    if (!mostrarModal || !estudianteSeleccionado) {
      console.log(
        "Modal no se renderiza - mostrarModal:",
        mostrarModal,
        "estudianteSeleccionado:",
        estudianteSeleccionado
      );
      return null;
    }

    return (
      <div
        className="modal-overlay"
        onClick={cerrarModal}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          className="modal-detalles"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            maxWidth: "500px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3>👤 Detalles del Estudiante</h3>
            <button
              onClick={cerrarModal}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Nombre Completo:</strong> {estudianteSeleccionado.nombre}{" "}
              {estudianteSeleccionado.apellido}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Código de Estudiante:</strong>{" "}
              {estudianteSeleccionado.codigoEstudiante}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Carrera:</strong> {estudianteSeleccionado.carrera}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {estudianteSeleccionado.fechaNacimiento}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Correo Electrónico:</strong>{" "}
              {estudianteSeleccionado.correo}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>No. Documento:</strong> {estudianteSeleccionado.documento}
            </div>
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={cerrarModal}
              style={{
                background: "#3498db",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (cargando) return <div>Cargando estudiantes...</div>;

  if (estudiantes.length === 0) {
    return (
      <div className="estudiante-list">
        <div className="tabla-container">
          <h2>Lista de Estudiantes</h2>
          {renderizarTabla(estudiantes)}
          <div className="no-estudiantes">No hay estudiantes registrados.</div>
        </div>
        <ModalDetalles />
      </div>
    );
  }

  return (
    <div className="estudiante-list">
      <div className="tabla-container">
        <h2>Lista de Estudiantes ({estudiantes.length})</h2>
        {renderizarTabla(estudiantes)}
      </div>
      <ModalDetalles />
    </div>
  );
};

export default EstudianteList;
