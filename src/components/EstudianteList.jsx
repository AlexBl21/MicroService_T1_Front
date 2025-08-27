import React from 'react';
import './EstudianteList.css';

const EstudianteList = ({ estudiantes, onEliminarEstudiante }) => {
  if (estudiantes.length === 0) {
    return (
      <div className="estudiante-list">
        <h2>Lista de Estudiantes</h2>
        <div className="no-estudiantes">
          <p>📚 No hay estudiantes registrados</p>
          <p>¡Comienza registrando el primer estudiante!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="estudiante-list">
      <h2>Lista de Estudiantes ({estudiantes.length})</h2>
      <div className="estudiantes-grid">
        {estudiantes.map((estudiante) => (
          <div key={estudiante.id} className="estudiante-card">
            <div className="estudiante-info">
              <h3>👤 {estudiante.nombre} {estudiante.apellido}</h3>
              <p>
                <strong>📅 Fecha de Nacimiento:</strong>
                <span>{estudiante.fechaNacimiento}</span>
              </p>
              <p>
                <strong>🆔 Código de Estudiante:</strong>
                <span>{estudiante.codigoEstudiante}</span>
              </p>
              <p>
                <strong>🎓 Carrera:</strong>
                <span>{estudiante.carrera}</span>
              </p>
              <p>
                <strong>📧 Correo:</strong>
                <span>{estudiante.correo}</span>
              </p>
              <p>
                <strong>📝 Fecha de Registro:</strong>
                <span>{estudiante.fechaRegistro}</span>
              </p>
            </div>
            <button 
              className="btn-eliminar"
              onClick={() => onEliminarEstudiante(estudiante.id)}
            >
              🗑️ Eliminar Estudiante
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstudianteList;
