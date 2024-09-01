const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        }
    )
}

const removeFileExt = (fileName: string) => {
    return (fileName ?? '').trim().split('.').slice(0, -1).join('.')
}

const formatFileSize = (size: number) => {
    const kb = size / 1024
    if (kb < 1024) {
        return `${kb.toFixed(2)} KB`
    }

    const mb = kb / 1024
    return `${mb.toFixed(2)} MB`
}

const openUrl = (url: string) => {
    window.open(url, '_blank')
}

export const utilsService = {
    uuid,
    removeFileExt,
    formatFileSize,
    openUrl,
}
