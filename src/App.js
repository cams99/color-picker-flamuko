import React, { Component } from 'react'
import Formulario from './components/Fomulario';
import Imagen from './components/Imagen';
import Cargando from './components/Cargando';
import axios from 'axios';
import Swal from 'sweetalert2';

class App extends Component {
  state = { 
    productos: [],
    linea: '',
    cargando: false
  }

  enviarProducto = producto => {
    this.setState({ cargando: true })
    setTimeout(() => {
      let url = `http://lab.besign.com.ve/flamuko/html/api/saveColorByCod/`
      axios.get(url, {
        params: {
          producto: producto.producto,
          color: producto.color
        }
      })
        .then(res => {
          this.setState({ cargando: false })
          if (res.data === 'OK') {
            Swal.fire(
              '¡Bien hecho!',
              '¡El color ha sido subido con éxito!',
              'success'
            )
          } else if (res.data === 'ERROR') {
            Swal.fire(
              '¡Algo anda mal!',
              '¡El color ha sido subido con éxito!',
              'error'
            )
          }
        })
        .then(() => {
          this.linea(producto.linea)
        })
    }, 500);
  }

  linea = e => {
    let url = `http://lab.besign.com.ve/flamuko/html/api/searchByCod/${e}`
    axios.get(url)
      .then(res => {
        console.log(res.data)
        this.setState({
          productos: res.data
        })
        if (res.data.length === 0) {
          Swal.fire(
            '¡Completado!',
            '¡Todos los productos de esta línea tiene sus colores!',
            'success'
          )
        }
      })
    this.setState({
      linea: e
    })
  } 
  render() { 
    return ( 
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 imagen">
            <Imagen 
              linea={this.state.linea}
              />
          </div>
          <div className="col-12 formulario">
            <Formulario 
              productos={this.state.productos}
              producto={this.enviarProducto}
              lineas={this.state.lineas}
              linea={this.linea}
            />
            {
              (this.state.cargando)
                ? <div className="loading fade-in">
                    <div>
                      <Cargando />
                    </div>
                  </div>
                : ''
            }
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;