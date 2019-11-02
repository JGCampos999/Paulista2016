import React from 'react'

const NavBar = () => {
    return (
        <div className="pos-f-t" id="bla">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="p-3 bg-info text-white">
                    <h5 className="text-white h4"><a style={styleA} href='/sorteio'>Sorteio</a></h5>
                    <h5 className="text-white h4"><a style={styleA} href='/Times'>Times</a></h5>
                    <h5 className="text-white h4"><a style={styleA} href='/grupos'>Grupos</a></h5>
                    <h5 className="text-white h4"><a style={styleA} href='/GrupoSeparados'>Grupos Separados</a></h5>
                    <h5 className="text-white h4"><a style={styleA} href='/filtro'>Mais Opções</a></h5>
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
    textDecoration : 'none',
    color: '#ffffff'
}

export default NavBar;