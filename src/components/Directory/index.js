import React, { useEffect, useState } from 'react';
import './styles.scss';

import Board from './../../assets/board.jpg';
import Sensor from './../../assets/sensor.jpg';
import Final from './../../assets/final.jpg';
import Accesories from './../../assets/accesories.jpg';

import { firestore } from './../../firebase/utils';

import ProductBox from './../../components/ProductBox'

const Directory = props => {
    const [d, setD] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await firestore.collection("productos").get();
            // setD(data.docs.map(doc => (doc.data())));
            setD(data.docs);
            // const ids = data.docs.map(doc => (doc.id));
        }
        fetchData();
    }, []);

    return (
        <div className="directory">
            <div className="wrap">
                <div className="category" style={{backgroundImage: `url(${Board})`}}>
                    <p>Compra Tarjetas</p>
                </div>
                <div className="category" style={{backgroundImage: `url(${Sensor})`}}>
                    <p>Compra Sensores</p>
                </div>
                <div className="category" style={{backgroundImage: `url(${Final})`}}>
                    <p>Compra Productos Domesticos</p>
                </div>
                <div className="category" style={{backgroundImage: `url(${Accesories})`}}>
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
