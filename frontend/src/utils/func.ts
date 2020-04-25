
export function getDisplayBytes(bytes: number): string {
    if (bytes < 1e3) {
        return `${bytes} B`
    } else if (bytes < 1e6) {
        return `${(bytes / 1024).toFixed(2)} KB`
    } else if (bytes < 1e9) {
        return `${(bytes / (1024 ** 2)).toFixed(2)} MB`
    } else {
        return `${(bytes / (1024 ** 3)).toFixed(2)} GB`
    }
}
