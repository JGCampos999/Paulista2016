import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Sorteio from './sorteio'
import Filtro from './filtro'

const Route = () => {
    return (
        <div>
            <aside className="ml-5 float-left text-center" style={this.asideStyle}>
                <button type="button" class="btn btn-primary" onClick={() => { this.getSorteio() }}>Sortear</button>
                <br />
                <br />
                O sorteio é realizado de forma aleatória
                    <br />
                <br />
                <input type="date" onChange={(e) => { this.setState({ data: e.target.value }) }} />
                <br />
                <br />
                <button type="button" class="btn btn-primary" onClick={() => { this.getByDate(this.state.data) }}>selecionar por data</button>
            </aside>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Sorteio} />
                    <Route path="/filtro" component={Filtro} />
                    <Route path="/sorteio" component={Sorteio} />
                </Switch>
            </BrowserRouter>

        </div>
    )
}