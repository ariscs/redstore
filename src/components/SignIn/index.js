import React, { Component } from 'react';
import './styles.scss';

import Button from './../forms/Button';

import { signInWithGoogle } from './../../firebase/utils'

class SignInComponent extends Component {

    handleSubmit = async e => {
        e.preventDefault();
    }

    render(){
        return (
            <div className="signin">
                <div className="wrap">
                    <h2>Iniciar Sesión</h2>
    
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="social">
                                <div className="row">
                                    <Button onClick={signInWithGoogle}>
                                       Inicia sesión con google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default SignInComponent;
