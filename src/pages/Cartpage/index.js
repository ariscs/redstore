import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';
import './styles.scss';

import { firestore, auth } from './../../firebase/utils';

import CartItem from './../../components/CartItem';

const Cartpage = props => {
    const history = useHistory();

    const [cart, setCart] = useState({});
    const [p, setP] = useState([]);
    const [totalC, setTotalC] = useState(0);

    const [estado, setEstado] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [direccion, setDireccion] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            let sellRef = await firestore.collection('ventas').doc(auth.currentUser.uid+'cart');
            let getDoc = sellRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    setCart(doc.data());
                    setP(doc.data().productos);
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        }
        fetchData();
    }, [cart]);

    const updateCart = () => {
        let x = cart;
        for (var i = 0; i < x.productos.length; i++){
            if (x.productos[i].cantidad == 0){
                x.productos.splice(i, 1);
            }
        }

        setCart(x);

        let setDoc = firestore.collection('ventas').doc(cart.user+'cart').set(cart);
    }

    const handleChange = (item, c) => {
        let x = cart;
        for (var i = 0; i < x.productos.length; i++){
            if (x.productos[i].producto == item){
                x.productos[i].cantidad = c;
                setCart(x);
                updateCart();
            }
        }
    }

    const getTotalC = () => {
        let total = 0;
        for (var i = 0; i < cart.productos.length; i++){
            total += (cart.productos[i].precio*cart.productos[i].cantidad);
        }
        setTotalC(total);
    }

    const handleSell = () => {
        if (estado === "" || ciudad === "" || direccion === "") {
            store.addNotification({
                title: "No fue posible continuar",
                message: "Verifica que los campos esten completos para que puedas recibir tu paquete",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        } else {
            let total = 0;
            for (var i = 0; i < cart.productos.length; i++){
                total += (cart.productos[i].precio*cart.productos[i].cantidad);
            }
            
            let venta = {
                total: total,
                estado: estado.toLowerCase(),
                ciudad: ciudad.toLowerCase(),
                direccion: direccion.toLowerCase(),
                user: cart.user,
                date: new Date().toDateString()
            }

            let setDoc = firestore.collection('completa').doc().set(venta);

            store.addNotification({
                title: "Venta completada!",
                message: "En un momento podras seguir comprando",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });

            history.push("/")
        }
    }

    return(
        <section className="homepage">
            <div className="wrap">
                <div className="cart">
                    <div className="title">
                        <h1>Carrito</h1>
                    </div>
                    <div className="items">
                        {p.map((item, i) => (
                            <CartItem key={i} data={item} handleChange={handleChange}/>
                        ))}
                    </div>
                    <div className="total">
                        <div className="total--text">
                            <p>Total:</p>
                        </div>
                        <div className="total--price">
                            <p>${totalC}.00</p>
                        </div>    
                    </div>
                    <div className="form">
                        <input type="text" placeholder="Estado" onChange={e => setEstado(e.target.value)} />
                        <input type="text" placeholder="Ciudad" onChange={e => setCiudad(e.target.value)} />
                        <input type="text" placeholder="Dirección" onChange={e => setDireccion(e.target.value)} />
                    </div>
                    <div className="buy">
                        <button onClick={getTotalC}>Confirmar</button>
                        <button onClick={handleSell}>Comprar</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cartpage;