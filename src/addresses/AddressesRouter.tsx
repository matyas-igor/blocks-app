import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AddressesIndexRoute, AddressesSingleRoute } from './routes'

export const AddressesRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/addresses">
        <AddressesIndexRoute />
      </Route>
      <Route path="/addresses/:hash">
        <AddressesSingleRoute />
      </Route>
      <Route path="*">
        <Redirect to="/addresses" />
      </Route>
    </Switch>
  )
}
