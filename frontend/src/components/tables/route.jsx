import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Times from './times'
import Grupos from './grupos'
import Sorteio from './sorteio'
import Filtro from './filtro'
import Rebaixados from './rebaixados'
import GruposSeparados from './gruposSeparados'
import Finalistas from './finalistas';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Times} />
          <Route path="/Times" component={Times} />
          <Route path="/Grupos" component={Grupos} />
          <Route path="/sorteio" component={Sorteio} />
          <Route path="/filtro" component={Filtro} />
          <Route path="/rebaixados" component={Rebaixados} />
          <Route path="/finalistas" component={Finalistas} />
          <Route path="/GrupoSeparados" component={GruposSeparados} />
        </Switch>
      </BrowserRouter>


    </div>
  )
}

export default Router;