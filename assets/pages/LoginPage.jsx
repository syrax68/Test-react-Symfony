import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import authApi from '../helpers/auth.api';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('');

    const handleChange = ({currentTarget}) =>{
        const {value, name} = currentTarget;
        
        setCredentials({...credentials, [name]:value});
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            await authApi.authenticate(credentials);
            setError("");
            window.location.href= '/'
        } catch (error) {
            setError('Vérifier votre nom ou votre mot de passe')
        }
    }
    return(
        <>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='username'>Nom utilisateur</label>
                    <input 
                        type="email" 
                        className={"form-control" + (error && " is-invalid")} 
                        id='username' 
                        name='username' 
                        placeholder='votre username' 
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    {error && <p className='invalid-feedback'>{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Mot de passe</label>
                    <input 
                        type="text" 
                        id='password' 
                        name='password' 
                        className='form-control' 
                        placeholder='votre mot de passe' 
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <button 
                        type='submit' 
                        className='btn ntn-success'
                    >
                        Je me connecte
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;