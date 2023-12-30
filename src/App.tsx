import React, { Component } from 'react';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { Container, Grid, Menu, Segment, Image } from 'semantic-ui-react';

import { NotFound } from './components/NotFound';
import { Books } from './components/Books';

export interface AppProps {}

export interface AppProps {
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
  }

  render() {
    return (
      <Container>
        <style>
          {`
          html, body {
            background-color: #DBAE58 !important;
            color: #fff !important;
          }
          h1.ui.header {
            color: #fff !important;
          }
          p > span {
            opacity: 0.4;
            text-align: center;
          }
        }
        `}
        </style>
        <Segment style={{ padding: '2em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }

  generateMenu() {
    return (
      <Menu pointing secondary>
        <Menu.Item name="books">
          <Link to="/">Browse Books</Link>
        </Menu.Item>
      </Menu>
    )
  }

  generateCurrentPage() {

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Books {...props} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}