import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { BlocksIndexRoute, BlocksSingleRoute } from './routes'

export const BlocksRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/blocks">
        <BlocksIndexRoute />
      </Route>
      <Route path="/blocks/:hash">
        <BlocksSingleRoute />
      </Route>
      <Route path="*">
        <Redirect to="/blocks" />
      </Route>
    </Switch>
  )
}
