import React from 'react'

const Navbar = () =>{
    return(
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="#">Accueil</a>
                    <a className="navbar-brand" href="#/users">Clients</a>
                </div>
                <div>
                    <button className="btn btn-submit" type="button">
                        Inscription
                    </button>
                    <button className="btn btn-success" type="button">
                        Connexion
                    </button>
                    <button className="btn btn-warning" type="button">
                        Deconnexion
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;