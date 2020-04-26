import React from 'react'
import {
    ListItem, ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction, IconButton, List, ListSubheader,
} from '@material-ui/core'

import {
    Folder, OpenInBrowser, InsertDriveFile, Link
} from '@material-ui/icons'

import { getDisplayBytes } from './utils/func'
import { getDownloadLink } from './api'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as clipboard from "clipboard-polyfill"

class FoldersListImpl extends React.Component<{
    folders: CowFolderDocument[],
    onRouteUpdate: () => any,
} & RouteComponentProps, object> {
    render(): React.ReactNode {
        const items = this.props.folders.map(it => <ListItem key={it.guid}>
            <ListItemAvatar>
                <Avatar>
                    <Folder />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={it.name} secondary={it.createdAt} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="open" onClick={
                    () => {
                        this.props.history.push(it.path)
                        this.props.onRouteUpdate()
                    }
                }>
                    <OpenInBrowser />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>)

        return (
            <List aria-labelledby="nested-dir-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-dir-subheader">
                        文件夹
                    </ListSubheader>
                }>
                { items }
            </List>
        )
    }
}

export const FoldersList = withRouter(FoldersListImpl)

export class FilesList extends React.Component<{
    files: CowFileDocument[]
}, object> {
    render(): React.ReactNode {
        function openDownload(guid: string) {
            console.log(guid)
            window.open(getDownloadLink(guid), '_black')
        }

        function copyDownload(guid: string) {
            clipboard.writeText(getDownloadLink(guid))
        }

        const items = this.props.files.map(it => <ListItem key={it.guid}>
                <ListItemAvatar>
                    <Avatar>
                        <InsertDriveFile />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={it.fileName} secondary={`${it.createdAt} - ${getDisplayBytes(it.sizeInByte)}`} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="open"
                        onClick={() => copyDownload(it.guid)}>
                        <Link />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="copy"
                        onClick={() => openDownload(it.guid)}>
                        <OpenInBrowser />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )


        return (
            <List aria-labelledby="nested-file-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-file-subheader">
                        文件
                    </ListSubheader>
                }>
                { items }
            </List>
        )
    }
}
