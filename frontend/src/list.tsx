import React from 'react'
import {
    Card, CardContent, Typography,
    Breadcrumbs
} from '@material-ui/core'

import { createBreadcrumbs } from './breadcrumbs'

import { listDir } from './api'
import { FilesList, FoldersList } from './info'
import Loading from './loading'

const CardHeader: React.FC = props => (
    <div className="list-card-header">
        {props.children}
    </div>
)

export default class ListComponent extends React.Component<{}, {
    folders: CowFolderDocument[]
    files: CowFileDocument[]
    loading: boolean
}> {
    constructor(props: any) {
        super(props)

        this.state = {
            files: [],
            folders: [],
            loading: true,
        }

        this.refreshDir()
    }

    refreshDir() {
        const path = location.pathname
        this.setState({
            ...this.state,
            loading: true,
        })

        listDir(path)
            .then((data: CowListDirDocument) => {
                this.setState({
                    files: data.files,
                    folders: data.folders,
                    loading: false,
                })
            })
    }

    getDirStatus() {
        if (!this.state.loading) {
            return <>
                <FoldersList
                    folders={this.state.folders}
                    onRouteUpdate={() => this.refreshDir()} />
                <FilesList files={this.state.files} />
            </>
        }

        return (
            <Loading />
        )
    }

    render(): React.ReactNode {
        const path = location.pathname
        const breadcrumbs = createBreadcrumbs(path)

        return (
            <Card className="list-card">
                <CardContent>
                    <CardHeader>
                        <Typography>
                        文件列表
                        </Typography>

                        <Breadcrumbs aria-label="breadcrumb">
                            { breadcrumbs }
                        </Breadcrumbs>
                    </CardHeader>

                    { this.getDirStatus() }

                </CardContent>
            </Card>
        )
    }
}
