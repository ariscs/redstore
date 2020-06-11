import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import './styles.scss';

import Board from './../../assets/board.jpg';
import Sensor from './../../assets/sensor.jpg';
import Final from './../../assets/final.jpg';
import Accesories from './../../assets/accesories.jpg';

import { firestore, auth } from './../../firebase/utils';

import ProductBox from './../../components/ProductBox'

const Directory = props => {
    const [d, setD] = useState([]);
    const [cart, setCart] = useState({
        productos: [],
        user: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await firestore.collection("productos").get();
            const userId = await auth.currentUser;

            setD(data.docs);
            if(userId){
                setCart({
                    ...cart,
                    user: userId.uid
                });
            }
        }

        fetchData();
    }, []);

    const cartHandle = async (pData, tag) => {
        if (cart.user === '') {
            alert("Es necesario iniciar sesión");
        } else {
            const nombre = await pData.nombre;
            const precio = await pData.precio;
            const productosCarrito = cart.productos;
            // alert(nombre+tag+precio);
            if(!productosCarrito.some(e => {
                //ID de cada producto
                if (e.producto ===  tag) {
                    e.cantidad += e.cantidad;
                    return true;
                }
            })) {
                productosCarrito.push({
                    cantidad: 1,
                    nombre: nombre,
                    precio: precio,
                    producto: tag,
                    img: pData.img
                });
            }

            setCart({
                ...cart,
                productos: productosCarrito,
            });
            

            let setDoc = firestore.collection('ventas').doc(cart.user+'cart').set(cart);

            store.addNotification({
                title: "Producto agregado",
                message: "Podrás terminar tu compra entrando a tu carrito",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
    }

    return (
        <div className="directory">
            <div className="wrapd">
                <div className="category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Board})`
                    }
                } >
                    <p>Compra Tarjetas</p>
                </div>
                <div className = "category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Sensor})`
                    }
                } >
                    <p>Compra Sensores</p>
                </div>
                <div className = "category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Final})`
                    }
                } >
                    <p>Compra Productos Domesticos</p>
                </div>
                <div className = "category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Accesories})`
                    }
                } >
                    <p>Compra Accesorios</p>
                </div>
            </div>
            <div className="content">
                <div className="pWrap">
                    {d.map(i => (
                        <ProductBox data={i.data()} key={i.id} tag={i.id} cartHandle={cartHandle}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Directory;
