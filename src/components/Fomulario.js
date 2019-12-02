import React, { Component } from 'react';

class Formulario extends Component {
    state = {
        linea: '',
        lineas: ['ARM-026', 'ARM-072', /*'ARM-81',*/ 'ARM-085', /*'ARM-156',*/ 'ARM-582', /*'ARM-590',*/ 'ARM-596', 'FLA-18', 'FLA-20', 'FLA-40', 'FLA-70', 'FLA-355', 'REG-359']
    }

    productoRef = React.createRef()
    colorRef = React.createRef()

    handleSubmit = e => {
        e.preventDefault()
        const producto = {
            linea: this.state.linea,
            producto: this.productoRef.current.value,
            color: this.colorRef.current.value
        }
        this.props.producto(producto)
    }
    handleChange = e => {
        let linea = e.target.value 
        this.props.linea(linea)
        this.setState({
            linea
        })
    }
    render() { 
        return (  
            <form className="row" onSubmit={this.handleSubmit}>
                <select className="col-3" name="linea" id="linea" onChange={this.handleChange}>
                    <option value="">Selecciona una linea</option>
                    {
                        this.state.lineas.map((linea, key) => (
                            <option key={key} value={linea}>{linea}</option>
                        ))
                    }
                </select>
                {
                    (this.state.linea)
                        ?   (this.props.productos.length > 0)   
                                ?   <React.Fragment>
                                        <select className="col-5" name="producto" id="producto" ref={this.productoRef}>
                                            {
                                                this.props.productos.map((producto, key) => (
                                                    <option value={producto.nombre} key={key}>{producto.nombre}</option>
                                                ))
                                            }
                                        </select>
                                        <input className="col-1" type="color" name="color" id="color" ref={this.colorRef} />
                                        <div className="w-100"></div>
                                        <button className="btn btn-success" type="submit">Guardar</button>
                                    </React.Fragment>   
                                :   ''
                        :   ""
                }
            </form>
        );
    }
}
 
export default Formulario;