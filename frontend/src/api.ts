import axios, { baseURL } from './utils/axios'

export async function listDir(path: string, page: number = 0): Promise<CowListDirDocument> {
    const res = axios.get<CowListDirDocument>(`/files/list${path}`)

    return (await res).data
}

export function getDownloadLink(guid: string) {
    return baseURL + '/files/download/' + guid
}
