import React, { useState } from 'react';

// actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import { useDispatch, useSelector } from 'react-redux';


const NuevoProducto = ({history}) => {
  
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  console.log(cargando)

  const dispach = useDispatch();

  const agregarProducto = producto => dispach( crearNuevoProductoAction(producto) )

  const submitNuevoProducto = e => {
    e.preventDefault();

    if ( nombre.trim() === '' || precio <= 0 ) {
      return;
    }

    agregarProducto({nombre, precio});

    history.push('/')

  }
  
  return ( 
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar nuevo producto
            </h2>

            <form
              onSubmit={submitNuevoProducto}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input 
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Agregar</button>
            </form>
            { cargando ? <p>...cargando</p> : null}
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default NuevoProducto;