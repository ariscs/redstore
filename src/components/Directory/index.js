import React from 'react';
import './styles.scss';

import Board from './../../assets/board.jpg';
import Sensor from './../../assets/sensor.jpg';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="category" style={{backgroundImage: `url(${Board})`}}>
                    <a>Compra Tarjetas</a>
                </div>
                <div className="category" style={{backgroundImage: `url(${Sensor})`}}>
                    <a>Compra Sensores</a>
                </div>
            </div>
        </div>
    );
};

export default Directory;
