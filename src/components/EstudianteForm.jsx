import { useState } from 'react';
import './EstudianteForm.css';

const EstudianteForm = ({ onRegistrarEstudiante }) => {
  const [estudiante, setEstudiante] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    codigoEstudiante: '',
    carrera: '',
    correo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudiante(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estudiante.nombre && estudiante.apellido && estudiante.fechaNacimiento && 
        estudiante.codigoEstudiante && estudiante.carrera && estudiante.correo) {
      onRegistrarEstudiante({
        ...estudiante,
        id: Date.now(),
        fechaRegistro: new Date().toLocaleDateString('es-ES')
      });
      setEstudiante({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        codigoEstudiante: '',
        carrera: '',
        correo: ''
      });
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  return (
    <div className="estudiante-form">
      <h2>Registrar Nuevo Estudiante</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre y Apellido en la misma fila */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={estudiante.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={estudiante.apellido}
              onChange={handleChange}
              placeholder="Ingrese el apellido"
              required
            />
          </div>
        </div>

        {/* Fecha de Nacimiento y Código de Estudiante en la misma fila */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={estudiante.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="codigoEstudiante">Código de Estudiante:</label>
            <input
              type="text"
              id="codigoEstudiante"
              name="codigoEstudiante"
              value={estudiante.codigoEstudiante}
              onChange={handleChange}
              placeholder="Ingrese el código de estudiante"
              required
            />
          </div>
        </div>

        {/* Carrera y Correo en filas separadas para mejor legibilidad */}
        <div className="form-group">
          <label htmlFor="carrera">Carrera:</label>
          <input
            type="text"
            id="carrera"
            name="carrera"
            value={estudiante.carrera}
            onChange={handleChange}
            placeholder="Ingrese la carrera"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={estudiante.correo}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <button type="submit" className="btn-registrar">
          Registrar Estudiante
        </button>
      </form>
    </div>
  );
};

export default EstudianteForm;
