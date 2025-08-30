import { useState } from "react";
import "./EstudianteForm.css";
import {
  consultarEstudiantes,
  registrarEstudiante,
} from "../api/EstudianteApi";

const EstudianteForm = ({ onRegistrarEstudiante }) => {
  const [estudiante, setEstudiante] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    codigoEstudiante: "",
    carrera: "",
    correo: "",
    documento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudiante((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      estudiante.nombre &&
      estudiante.apellido &&
      estudiante.fechaNacimiento &&
      estudiante.codigoEstudiante &&
      estudiante.carrera &&
      estudiante.correo &&
      estudiante.documento
    ) {
      try {
        const nuevoEstudiante = {
          codigo: parseInt(estudiante.codigoEstudiante),
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          correo: estudiante.correo,
          documento: parseInt(estudiante.documento),
          fecha_nacimiento: estudiante.fechaNacimiento,
          carrera: estudiante.carrera,
        };

        const res = await registrarEstudiante(nuevoEstudiante);
        console.log("Estudiante creado:", res);

        if (onRegistrarEstudiante) onRegistrarEstudiante(res);

        // Limpiar formulario
        setEstudiante({
          nombre: "",
          apellido: "",
          fechaNacimiento: "",
          codigoEstudiante: "",
          carrera: "",
          correo: "",
          documento: "",
        });
      } catch (error) {
        console.error(error);
        alert("Error al registrar estudiante: " + error.message);
      }
    } else {
      alert("Por favor, completa todos los campos");
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

        {/* Carrera y documento en filas juntas y correo separadas para mejor legibilidad */}
        <div className="form-row">
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
            <label htmlFor="documento">Documento de Identidad:</label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={estudiante.documento}
              onChange={handleChange}
              placeholder="Ingrese el número de identidad"
              required
            />
          </div>
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
