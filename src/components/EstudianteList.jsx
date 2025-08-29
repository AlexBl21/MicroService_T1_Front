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

  // Debug: mostrar el estado actual

  // Modal simplificado para testing
  const ModalDetalles = () => {
    if (!mostrarModal || !estudianteSeleccionado) {
      console.log("Modal no se renderiza - mostrarModal:", mostrarModal, "estudianteSeleccionado:", estudianteSeleccionado);
      return null;
    }
    
    return (
      <div 
        className="modal-overlay" 
        onClick={cerrarModal}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <div 
          className="modal-detalles" 
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>👤 Detalles del Estudiante</h3>
            <button 
              onClick={cerrarModal}
              style={{
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
          
          <div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Nombre Completo:</strong> {estudianteSeleccionado.nombre} {estudianteSeleccionado.apellido}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Código de Estudiante:</strong> {estudianteSeleccionado.codigoEstudiante}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Carrera:</strong> {estudianteSeleccionado.carrera}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Fecha de Nacimiento:</strong> {estudianteSeleccionado.fechaNacimiento}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Correo Electrónico:</strong> {estudianteSeleccionado.correo}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Fecha de Registro:</strong> {estudianteSeleccionado.fechaRegistro}
            </div>
          </div>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              onClick={cerrarModal}
              style={{
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (estudiantes.length === 0) {
    return (
      <div className="estudiante-list">
        <div className="tabla-container">
          <h2>Lista de Estudiantes</h2>
          {renderizarTabla(estudiantesEjemplo, true)}
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
