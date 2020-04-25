import React from 'react'
import {
    Card, CardContent, Typography,
    Breadcrumbs, ListItem,
    ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction, IconButton, List, ListSubheader,
} from '@material-ui/core'

import {
    OpenInBrowser, InsertDriveFile,
} from '@material-ui/icons'

import { createBreadcrumbs } from './breadcrumbs'

import { listDir } from './api'
import { GetFolders } from './info'

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
    }

    render(): React.ReactNode {
        const path = location.pathname
        const breadcrumbs = createBreadcrumbs(path)

        listDir(path)
            .then((data: CowListDirDocument) => {
                this.setState({
                    files: data.files,
                    folders: data.folders,
                    loading: false,
                })
            })

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

                    { GetFolders(this.state.folders) }

                    <List aria-labelledby="nested-file-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-file-subheader">
                                文件
                            </ListSubheader>
                        }>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <InsertDriveFile />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <OpenInBrowser />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        )
    }
}
