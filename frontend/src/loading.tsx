import React from 'react'

import { CircularProgress, Typography } from '@material-ui/core'

export default class LoadingComponent extends React.Component<{}, object> {
    render(): React.ReactNode {
        return (
            <div className="list-loading">
                <CircularProgress />
                <Typography>加载中</Typography>
            </div>
        )
    }
}
