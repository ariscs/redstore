import React from 'react';
import './styles.scss';

const Cartpage = props => {
    return(
        <section className="homepage">
            <div className="wrap">
                <div className="cart">
                    <div className="title">
                        <h1>Carrito</h1>
                    </div>
                    <div className="items">
                        
                    </div>
                    <div className="total">
                        <div className="total--text">
                            <p>Total:</p>
                        </div>
                        <div className="total--price">
                            <p>$.00</p>
                        </div>    
                    </div>
                    <div className="form">
                        <input type="text" placeholder="Estado" />
                        <input type="text" placeholder="Ciudad" />
                        <input type="text" placeholder="Dirección" />
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