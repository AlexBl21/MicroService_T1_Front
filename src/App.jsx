import { useState } from 'react'
import EstudianteForm from './components/EstudianteForm'
import EstudianteList from './components/EstudianteList'
import './App.css'

function App() {
  const [estudiantes, setEstudiantes] = useState([])

  const registrarEstudiante = (nuevoEstudiante) => {
    setEstudiantes(prev => [...prev, nuevoEstudiante])
    alert('Estudiante registrado exitosamente!')
  }

  const eliminarEstudiante = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      setEstudiantes(prev => prev.filter(estudiante => estudiante.id !== id))
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Registro de Estudiantes</h1>
        <div className="header-stats">
          <span className="stat-item">
            📊 Total de Estudiantes: <strong>{estudiantes.length}</strong>
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
  )
}

export default App
