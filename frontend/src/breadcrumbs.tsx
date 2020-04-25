import React from 'react'
import {
    Link
} from '@material-ui/core'

export function createBreadcrumbs(path: string) {
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

    return breadcrumbs
}
