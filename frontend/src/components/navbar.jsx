import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const NavBar = () => {
    return (

        <div className="pos-f-t" id="bla">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="p-3 bg-info text-white">
                  
                        <Router>
                            <Link className="text-white h4" to="/sorteio">Sorteio </Link><br/>
                            <Link className="text-white h4" to='/Times'>Times</Link><br/>
                            <Link className="text-white h4" to='/grupos'>Grupos</Link><br/>
                            <Link className="text-white h4" to='/GrupoSeparados'>Grupos Separados</Link><br/>
                            <Link className="text-white h4" to='/rebaixados'>Rebaixados</Link><br/>
                            <Link className="text-white h4" to='/filtro'> Mais Opções </Link><br/>
                        </Router>

                </div>
            </div>
            <nav className="navbar navbar-dark bg-info">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Alterna navegação">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    )
}

const styleA = {
    textDecoration: 'none',
    color: '#ffffff'
}

export default NavBar;