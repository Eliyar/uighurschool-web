import { Lesson } from '../models/Lesson.model'

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

const formatFileName = (fileName: string) => {
    // Remove (1) suffix added by os
    return fileName.replace(/\s*\(\d+\)$/, '')
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

const getFileFromUrl = async (fileName: string, url: string): Promise<File> => {
    const res = await fetch(url)
    const blob = await res.blob()
    return new File([blob], fileName, { type: blob.type })
}

// Suggest the next lesson name in the format "Lesson 1 - Grade 1"
const suggestNextLessonName = (previousLesson: Lesson) => {
    const previousLessonName = previousLesson.name
    const regex = /^Lesson (\d+)( - .*)?$/
    const match = previousLessonName.match(regex)
    if (match) {
        const number = parseInt(match[1])
        return `Lesson ${number + 1}${match[2] ?? ''}`
    }
    return ''
}

export const utilsService = {
    uuid,
    removeFileExt,
    formatFileName,
    formatFileSize,
    openUrl,
    getFileFromUrl,
    suggestNextLessonName,
}
