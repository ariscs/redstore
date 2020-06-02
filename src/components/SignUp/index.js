import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const SignUp = props => {
    const history = useHistory();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }
    
    const handleFormSubmit = async event => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            const err = ['Las contraseñas no coinciden'];
            setErrors(err);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            reset();
            history.push('/');
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="complete">
        <div className="half1" style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%),url(https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=750&q=80)`}}>
            <h1>La mejor tienda de productos de IOT</h1>
        </div>
        <div className="signup">
            <div className="wrap">
                <h2>Registro</h2>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return(
                                <li key={index}>{err}</li>
                            );
                        })}
                    </ul>
                )}

                <div className="formWrap">
                    <form onSubmit={handleFormSubmit}>
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Nombre completo"
                            handleChange={e => setDisplayName(e.target.value)}
                        />

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

                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirma contraseña"
                            handleChange={e => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit">Registrar</Button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default withRouter(SignUp);
