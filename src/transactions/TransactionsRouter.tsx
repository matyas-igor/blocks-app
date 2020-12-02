import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { TransactionsIndexRoute, TransactionsSingleRoute } from './routes'

export const TransactionsRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/transactions">
        <TransactionsIndexRoute />
      </Route>
      <Route path="/transactions/:hash">
        <TransactionsSingleRoute />
      </Route>
      <Route path="*">
        <Redirect to="/transactions" />
      </Route>
    </Switch>
  )
}
