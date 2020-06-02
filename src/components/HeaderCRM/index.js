import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

import Logo from './../../assets/logo.png'

const HeaderCRM = props => {  
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/crm">
                        <img src={Logo} alt="RedStore LOGO"/>
                    </Link>
                </div>

                <div className="callToActions">
                    <ul>
                        <li><Link to="/crm">Clientes</Link></li>
                        <li><Link to="/ventas">Ventas</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default HeaderCRM;
