import React from 'react'
import { Button } from '@material-ui/core'

export default class AppComponent extends React.Component<{}, object> {
    render(): React.ReactNode {
        return (
            <>
                <h1>Hello, World</h1>
                <Button color="primary">Hello World</Button>
            </>
        )
    }
}
