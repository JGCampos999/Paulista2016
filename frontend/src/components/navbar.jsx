import React from 'react'
import './navbar.css'

const NavBar = () => {
    return (
        <div className="pos-f-t" id="bla">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="p-3 bg-info text-white">
                    <h5 className="text-white h4"><a className="link" href='/sorteio'>Sorteio</a></h5>
                    <h5 className="text-white h4"><a className="link" href='/tabela'>tabela1</a></h5>
                    <h5 className="text-white h4"><a className="link" href='/tabela'>tabela2</a></h5>
                    <h5 className="text-white h4"><a className="link" href='/tabela'>tabela3</a></h5>
                    <h5 className="text-white h4"><a className="link" href='/tabela'>tabela4</a></h5>
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

export default NavBar;