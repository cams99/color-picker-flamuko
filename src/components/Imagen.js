import React from 'react';

const Imagen = (props) => {
    return (  
        <React.Fragment>
            {
                (props.linea)
                    ?   <img src={`./img/${props.linea}.jpg`} alt={`Linea ${props.linea}`}/>
                    :   <img className="logo" src="./img/flamuko-logo.png" alt="Flamuko"/>
            }
        </React.Fragment>
    );
}

export default Imagen;