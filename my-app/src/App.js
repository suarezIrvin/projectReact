import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const [modelo, setModelo] = useState("");
  const [serie, setSerie] = useState("");
  const [mouse, setMouse] = useState("");
  const [teclado, setTeclado] = useState("");
  const [escritorio, setEscritorio] = useState("");
  const [id, setID] = useState(0);
  const [computadorasList, setComputadoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getComputadoras();
  }, []); // Se ejecuta solo una vez al montar el componente

  const add = () => {
    Axios.post("http://localhost:3005/nuevo", {
      nombre,
      estado,
      modelo,
      serie,
      mouse,
      teclado,
      escritorio
    })
      .then(() => {
        getComputadoras();
        Swal.fire({
          title: "Registro Exitoso",
          text: "La computadora se agregó!",
          icon: "success"
        });
        // Reiniciar los valores de los campos después de registrar
        setNombre("");
        setEstado("");
        setModelo("");
        setSerie("");
        setMouse("");
        setTeclado("");
        setEscritorio("");
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: "Error al registrar la computadora",
          icon: "error"
        });
        console.error(error);
      });
  }

  const update = () => {
    Axios.put("http://localhost:3005/Actualizar", {
      id,
      nombre,
      estado,
      modelo,
      serie,
      mouse,
      teclado,
      escritorio
    })
      .then(() => {
        getComputadoras();
        Swal.fire({
          title: "Registro Actualizado",
          text: "La computadora se actualizó!",
          icon: "success"
        }).then(() => {
          // Desplazar la página hacia arriba después de actualizar
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        setID("");
        setNombre("");
        setEstado("");
        setModelo("");
        setSerie("");
        setMouse("");
        setTeclado("");
        setEscritorio("");
        setEditar(false); // Cambiar editar a falso después de actualizar
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: "Error al actualizar la computadora",
          icon: "error"
        });
        console.error(error);
      });
  }
  
  const deleteComputadoras = (idToDelete) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3005/borrar/${idToDelete}`)
          .then(() => {
            getComputadoras();
            Swal.fire({
              title: 'Registro Eliminado',
              text: 'La computadora se eliminó!',
              icon: 'success'
            });
          })
          .catch(error => {
            Swal.fire({
              title: 'Error',
              text: 'Error al borrar la computadora',
              icon: 'error'
            });
            console.error(error);
          });
      }
    });
  }

  const editarComputadoras = (val) => {
    setEditar(true); // Cambiar editar a verdadero al editar una computadora

    setID(val.id); // Establecer el ID del registro que se está editando
    setNombre(val.nombre);
    setEstado(val.estado);
    setModelo(val.modelo);
    setSerie(val.serie);
    setMouse(val.mouse);
    setTeclado(val.teclado);
    setEscritorio(val.escritorio);

    // Desplazar la página hacia arriba cuando se haga clic en el botón "Editar"
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cancelarEdicion = () => {
    // Reiniciar todos los campos al hacer clic en el botón de cancelar
    setID("");
    setNombre("");
    setEstado("");
    setModelo("");
    setSerie("");
    setMouse("");
    setTeclado("");
    setEscritorio("");
    setEditar(false);
    // Desplazar la página hacia arriba después de cancelar la edición
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const getComputadoras = () => {
    Axios.get("http://localhost:3005/lista")
      .then((response) => {
        setComputadoras(response.data);
        setLoading(false);
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: "Error al obtener las computadoras",
          icon: "error"
        });
        console.error(error);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'estado':
        setEstado(value);
        break;
      case 'modelo':
        setModelo(value);
        break;
      case 'serie':
        setSerie(value);
        break;
      case 'mouse':
        setMouse(value);
        break;
      case 'teclado':
        setTeclado(value);
        break;
      case 'escritorio':
        setEscritorio(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE COMPUTADORAS
        </div>
        <div className="card-body d-flex flex-column align-items-center">
          <div className="input-group mb-3">
            <div className="input-group-text">Nombre:</div>
            <input
              name="nombre"
              value={nombre}
              onChange={handleChange}
              type='text'
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">Estado:</div>
            <select name="estado" value={estado} onChange={handleChange} className="form-select">
              <option value="" disabled hidden>Seleccione una opción</option>
              <option value={1}>Servicio</option>
              <option value={2}>Ocupado</option>
              <option value={3}>Fuera de servicio</option>

            </select>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">Modelo:</div>
            <input
              name="modelo"
              value={modelo}
              onChange={handleChange}
              type='text'
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">Serie:</div>
            <input
              name="serie"
              value={serie}
              onChange={handleChange}
              type='number'
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">Mouse:</div>
            <input
              name="mouse"
              value={mouse}
              onChange={handleChange}
              type='text'
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">Teclado:</div>
            <input
              name="teclado"
              value={teclado}
              onChange={handleChange}
              type='text'
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">Escritorio:</div>
            <select name="escritorio" value={escritorio} onChange={handleChange} className="form-select">
              <option value="" disabled hidden>Seleccione un escritorio</option>
              <option value={1}>Escritorio 1</option>
              <option value={2}>Escritorio 2</option>
              <option value={3}>Escritorio 3</option>
            </select>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            <button className='btn btn-success' onClick={add}>Registrar</button>
          )}
        </div>
      </div>

      {!loading && (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Estado</th>
              <th scope="col">Modelo</th>
              <th scope="col">Serie</th>
              <th scope="col">Mouse</th>
              <th scope="col">Teclado</th>
              <th scope="col">Escritorio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {computadorasList.map((val, key) => (
              <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.estado}</td>
                <td>{val.modelo}</td>
                <td>{val.serie}</td>
                <td>{val.mouse}</td>
                <td>{val.teclado}</td>
                <td>{val.escritorio}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={() => editarComputadoras(val)}>Editar</button>
                    <button type="button" className="btn btn-danger" onClick={() => { deleteComputadoras(val.id); }}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
