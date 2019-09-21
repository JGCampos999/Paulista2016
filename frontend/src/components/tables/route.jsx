import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Times from './times'

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Times} />
          <Route path="/Times" component={Times} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Router;