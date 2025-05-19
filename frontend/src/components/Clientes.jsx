import axios from 'axios'
import styled from 'styled-components';
import { useEffect, useState } from 'react'

export default function Clientes() {
  const [dataa, setData] = useState([])
  const [curp, setCurp] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [fecha, setFecha] = useState("")
  const [idd, setId] = useState("")

  // Configuración de axios para producción
  const api = axios.create({
    baseURL: '/cliente', // Usa el proxy configurado en nginx
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  useEffect(() => {
    mostrar()
  }, [])

  const mostrar = async () => {
    try {
      const response = await api.get('/Consulta')
      setData(response.data)
    } catch (err) {
      console.error("Error al obtener clientes:", err)
      // Puedes agregar aquí un toast de error si lo deseas
    }
  }

  const registro = async (e) => {
    e.preventDefault()

    const body = {
      nombre: nombre,
      apellido: apellido,
      curp: curp,
      fecha: fecha
    }

    if (curp.length > 15) {
      try {
        await api.post('/registrar', body)
        mostrar()
        setNombre("")
        setApellido("")
        setCurp("")
        setFecha("")
      } catch (err) {
        console.error("Error al registrar:", err)
        alert("Error al registrar cliente")
      }
    } else {
      alert("Coloca un CURP válido (mínimo 16 caracteres)")
    }
  }

  const borrar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        await api.delete(`/${id}`)
        mostrar()
      } catch (err) {
        console.error("Error al eliminar:", err)
        alert("Error al eliminar cliente")
      }
    }
  }

  const editar = async (e) => {
    e.preventDefault()

    const body = {
      nombre: nombre,
      apellido: apellido,
      curp: curp,
      fecha: fecha
    }

    try {
      await api.put(`/actualizar/${idd}`, body)
      mostrar()
      // Cierra el modal después de editar
      document.getElementById('closeModal').click()
    } catch (err) {
      console.error("Error al editar:", err)
      alert("Error al editar cliente")
    }
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <StyledWrapper>
            <div className="form-box">
              <form className="form" onSubmit={registro}>
                <span className="title">Registra un nuevo Cliente</span>
                <div className="form-container">
                  <input
                    type="text"
                    className="input"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    pattern="[a-zA-Z ]{2,254}"
                    title="No puede contener caracteres especiales o números"
                    required
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    pattern="[a-zA-Z ]{2,254}"
                    title="No puede contener caracteres especiales o números"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="CURP"
                    value={curp}
                    onChange={(e) => setCurp(e.target.value)}
                    minLength="16"
                    required
                  />
                </div>
                <button type='submit'>Registrar</button>
              </form>
            </div>
          </StyledWrapper>
        </div>
      </div>

      <div className="row">
        {dataa.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <StyledWrapper>
              <div className="card">
                <div className="card__img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%">
                    {/* SVG content remains the same */}
                  </svg>
                </div>
                <div className="card__avatar">
                  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content remains the same */}
                  </svg>
                </div>
                <div className="card__title">{item.nombre}</div>
                <div className="card__subtitle">{item.apellido}</div>
                <div className="card__wrapper">
                  <button
                    className="card__btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setId(item.id)
                      setNombre(item.nombre)
                      setApellido(item.apellido)
                      setCurp(item.curp)
                      setFecha(item.fecha)
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="card__btn"
                    onClick={() => borrar(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </StyledWrapper>
          </div>
        ))}
      </div>

      {/* Modal de Edición */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-box">
                <form className="form" onSubmit={editar}>
                  <div className="form-container">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      pattern="[a-zA-Z ]{2,254}"
                      title="No puede contener caracteres especiales o números"
                      required
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="Apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      pattern="[a-zA-Z ]{2,254}"
                      title="No puede contener caracteres especiales o números"
                      required
                    />
                    <input
                      type="date"
                      placeholder="Fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="CURP"
                      value={curp}
                      onChange={(e) => setCurp(e.target.value)}
                      minLength="16"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      id="closeModal"
                    >
                      Cerrar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858F;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    width: 300px;
    height: 384px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: var(--bg-color);
  }

  .card__img {
    height: 192px;
    width: 100%;
  }

  .card__img svg {
    height: 100%;
    border-radius: 20px 20px 0 0;
  }

  .card__avatar {
    position: absolute;
    width: 114px;
    height: 114px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 57px);
  }

  .card__avatar svg {
    width: 100px;
    height: 100px;
  }

  .card__title {
    margin-top: 60px;
    font-weight: 500;
    font-size: 18px;
    color: var(--main-color);
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 12px;
    color: var(--submain-color);
  }

  .card__btn {
    margin-top: 15px;
    width: 76px;
    height: 31px;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    font-weight: 700;
    font-size: 10px;
    color: var(--main-color);
    background: var(--bg-color);
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .card__btn-solid {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn:hover {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn-solid:hover {
    background: var(--bg-color);
    color: var(--main-color);
  }
  
  .form-box {
    max-width: 300px;
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  /*Form text*/
  .title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
  }

  /*Inputs box*/
  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 .5rem;
    width: 100%;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: .9rem;
    padding: 8px 15px;
  }

  .form-section {
    padding: 16px;
    font-size: .85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color .3s ease;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  /*Button*/
  .form button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color .3s ease;
  }

  .form button:hover {
    background-color: #005ce6;
  }
  
  `;