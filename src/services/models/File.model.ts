import { utilsService } from '../firebase/utils.service'

export class FileModel {
    id!: string
    name!: string
    tag?: FileTag
    size!: number
    downloadUrl!: string
    createdAt!: string
    deletedAt?: string
    subFiles?: FileModel[]

    static fromFile(file: File, downloadUrl: string): FileModel {
        const model: FileModel = {
            id: utilsService.uuid(),
            name: utilsService.removeFileExt(file.name),
            size: file.size,
            tag: FileModel.getTag(file.name),
            downloadUrl: downloadUrl,
            createdAt: new Date().toISOString(),
            subFiles: [],
        }
        return model
    }

    static getTag = (fileName: string): FileTag => {
        if (/(lesson)/i.test(fileName)) {
            return 'lesson'
        }
        return 'story'
    }
}

export type FileTag = 'lesson' | 'story'
