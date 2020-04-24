import React from 'react'
import {
    Button, Card, CardContent, Typography,
    Breadcrumbs, Link, Divider, ListItem,
    ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction, IconButton, List, ListSubheader,
} from '@material-ui/core'

import {
    Folder, Delete, OpenInBrowser, InsertDriveFile,
} from '@material-ui/icons'

const CardHeader: React.FC = props => (
    <div className="list-card-header">
        {props.children}
    </div>
)

export default class ListComponent extends React.Component<{}, object> {
    render(): React.ReactNode {
        const path = location.pathname

        const breadcrumbs = [
            <Link color="inherit" key="/" href="/">根目录</Link>,
        ]

        const pathFolders = path.split('/').filter(it => it.trim().length > 0)
        let fullPath = ''

        for (const pathFolder of pathFolders) {
            fullPath += `/${pathFolder}`
            breadcrumbs.push(
                <Link color="inherit" key={fullPath} href={fullPath}>
                    { pathFolder }
                </Link>,
            )
        }

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

                    <List aria-labelledby="nested-dir-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-dir-subheader">
                                文件夹
                            </ListSubheader>
                        }>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Folder />
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
