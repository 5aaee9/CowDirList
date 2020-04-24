import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DirListComponent from './list'
import { Container } from '@material-ui/core'

export default class AppComponent extends React.Component<{}, object> {
    render(): React.ReactNode {
        return (
            <Container fixed>
                <br />
                <BrowserRouter>
                    <Switch>
                        <Route path="/">
                            <DirListComponent />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Container>
        )
    }
}
