import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosCart } from 'react-icons/io'
import './styles.scss';

import { auth } from './../../firebase/utils';

import Logo from './../../assets/logo.png'

const Header = props => {
    const { currentUser } = props;    

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="RedStore LOGO"/>
                    </Link>
                </div>

                <div className="callToActions">
                    {currentUser && (
                    <ul>
                        <li>
                            <Link to="/carrito"><IoIosCart size="30px"/></Link>
                        </li>
                        <li><span onClick={() => auth.signOut()}>Salir</span></li>
                    </ul>
                    )}

                    {!currentUser && (
                    <ul>
                        <li><Link to="/registration">Registrarme</Link></li>
                        <li><Link to="/signin">Ingresar</Link></li>
                    </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null,
};

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);
