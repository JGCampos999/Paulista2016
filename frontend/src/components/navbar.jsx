import React from 'react'
import './navbar.css'

const NavBar = () => {
    return (
        <div className="pos-f-t">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="p-3 mb-2 bg-success text-white">
                    <h5 className="text-white h4">Conteúdo expandido</h5>
                    <span className="text-muted">Expansível, atráves da marca no navbar.</span>
                </div>
            </div>
            <nav class="navbar navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Alterna navegação">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    )
}

export default NavBar;