import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import './styles.scss';

import Button from './../forms/Button';
import FormInput from './../forms/FormInput';

import { signInWithGoogle, auth } from './../../firebase/utils'

const SignInComponent = props => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            history.push('/');
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="complete">
        <div className="half1" style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%),url(https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=750&q=80)`}}>
            <h1>La mejor tienda de productos de IOT</h1>
        </div>
        <div className="signin">
            <div className="wrap">
                <h2>Iniciar Sesión</h2>

                <div className="formWrap">
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Correo"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Contraseña"
                            handleChange={e => setPassword(e.target.value)}
                        />

                        <Button type="submit">
                            Iniciar sesión
                        </Button>

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
        </div>
    );
};

export default withRouter(SignInComponent);
