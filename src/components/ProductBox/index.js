import React from 'react';
import './styles.scss';

const ProductBox = ({ data, key }) => {
    return (
        <div className="pboxWrap">
            <div className="pbox">
                <div className="imgBox" style={{backgroundImage: `url(${data.img})`}}>
                    {/* <img src="/boards/amega.jpg"/> */}
                </div>
                <div className="product">
                    <div className="info">
                        <p>{data.nombre}</p>
                        <p>${data.precio}.00</p>
                    </div>
                    <div className="add">
                        <button>Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBox;