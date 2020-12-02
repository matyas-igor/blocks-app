import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { Normalize } from './common/components/Normalize'

import { BlocksRouter } from './blocks/BlocksRouter'
import { AddressesRouter } from './addresses/AddressesRouter'
import { TransactionsRouter } from './transactions/TransactionsRouter'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Normalize />
      <Router>
        <Switch>
          <Route path="/blocks">
            <BlocksRouter />
          </Route>
          <Route path="/addresses">
            <AddressesRouter />
          </Route>
          <Route path="/transactions">
            <TransactionsRouter />
          </Route>
          <Route path="*">
            <Redirect to="/blocks" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
