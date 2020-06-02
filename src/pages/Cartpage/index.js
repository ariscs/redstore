import React from 'react';
import './styles.scss';

const Cartpage = props => {
    return(
        <section className="homepage">
            <div className="shop">
            <div className="cart">
                 <div className="title">
                        <h3>Carrito de compras</h3>
                </div>
                    <div className="items">
                        
                    </div>
                <div className="back">Continuar comprando</div>
            </div>
            <div className="wrap2">
                    <h3>Detalles de compra</h3>
                    <div className="form">
                        <input type="text" placeholder="Estado" />
                        <input type="text" placeholder="Ciudad" />
                        <input type="text" placeholder="Dirección" />
                    </div>
                      <div className="total">
                        <div className="total--text">
                            <p>Total:</p>
                        </div>
                        <div className="total--price">
                            <p>$.00</p>
                        </div>    
                    </div>
                    <div className="buy">
                        <button>Comprar</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cartpage;