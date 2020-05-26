import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import Button from './../forms/Button';
import FormInput from './../forms/FormInput';

import { signInWithGoogle, auth } from './../../firebase/utils'

const SignInComponent = props => {
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
            props.history.push('/');
        } catch(err) {
            console.log(err);
        }
    }

    return (
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
    );
};

export default withRouter(SignInComponent);
