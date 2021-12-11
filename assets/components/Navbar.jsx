import React from 'react'
import { NavLink } from 'react-router-dom';
import authApi from '../helpers/auth.api'

const Navbar = () =>{
    const handleLogout = () =>{
        authApi.logout();
        window.location.href= '/'
    }

    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <NavLink className="navbar-brand" to="/">Accueil</NavLink>
                    <NavLink className="navbar-brand" to="/users">Clients</NavLink>
                </div>
                <div>
                    <NavLink className="btn btn-success" to="/login" type="button">
                        Connexion
                    </NavLink>
                    <button className="ml-2 btn btn-warning" onClick={handleLogout} type="button">
                        Deconnexion
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;