import React from 'react';
import './styles.scss';

const CartItem = props => {
    return(
        <div className="item">
            <div className="item--photo">
                <div className="photo" style={{backgroundImage: `url(${props.data.img})`}}></div>
            </div>
            <div className="item--info">
                <div className="name">
                    <p>{props.data.nombre}</p>
                </div>
                <div className="price">
                    <p>${props.data.precio*props.data.cantidad}.00</p>
                </div>
            </div>
            <div className="item--q">
                <input 
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0" max="100"
                    value={props.data.cantidad} 
                    step="1"
                    onChange={(e) => props.handleChange(props.data.producto, e.target.value)}
                />
            </div>
        </div>
    );
}

export default CartItem;