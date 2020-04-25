import React from 'react'
import {
    ListItem, ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction, IconButton, List, ListSubheader,
} from '@material-ui/core'

import {
    Folder, OpenInBrowser,
} from '@material-ui/icons'

export function GetFolders(folders: CowFolderDocument[]) {
    const items = folders.map(it => <ListItem key={it.guid}>
        <ListItemAvatar>
            <Avatar>
                <Folder />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={it.name} secondary={it.createdAt} />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="open">
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
