import React, { useEffect, useState } from 'react';
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
        user: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await firestore.collection("productos").get();
            const userId = await auth.currentUser;
            // setD(data.docs.map(doc => (doc.data())));
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

    return (
        <div className="directory">
            <div className="wrap">
                <div div className = "category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Board})`
                    }
                } >
                    <p>Compra Tarjetas</p>
                </div>
                <div div className = "category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Sensor})`
                    }
                } >
                    <p>Compra Sensores</p>
                </div>
                <div div className = "category"
                style = {
                    {
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),url(${Final})`
                    }
                } >
                    <p>Compra Productos Domesticos</p>
                </div>
                <div div className = "category"
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
                        <ProductBox data={i.data()} key={i.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Directory;
