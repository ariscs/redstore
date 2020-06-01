import React from 'react';
import './styles.scss';

const ProductBox = (props) => {
    return (
        <div className="pboxWrap">
            <div className="pbox">
                <div className="imgBox" style={{backgroundImage: `url(${props.data.img})`}}></div>

                <div className="product">
                    <div className="info">
                        <p className="nombre">{props.data.nombre}</p>
                        <p className="precio">${props.data.precio}.00</p>
                    </div>
                    <div className="add">
                        <button onClick={() => props.cartHandle(props.data, props.tag)}>Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBox;