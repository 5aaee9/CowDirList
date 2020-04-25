type CowFileDocument = {
    guid: string
    transferFileGuid?: string
    fileName: string
    sizeInByte: number
    downloadName: string
    createdAt: string
    contentType: string
    url?: string
    uploaded: boolean
    folder: boolean
    image: boolean
    sizeInMbInteger: number
}

type CowFolderDocument = {
    path: string
    guid: string
    name: string
    createdAt: string
    totalSizeInBytes: number
    files: number
    children: number
}

type CowListDirDocument = {
    files: CowFileDocument[]
    folders: CowFolderDocument[]
    path: string
    name: string
    guid: string
    currentPage: number
    totalPage: number
}
