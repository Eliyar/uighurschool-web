import Fuse from 'fuse.js'

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

    static sort = (files: FileModel[]): FileModel[] => {
        const groupedByTag = files.reduce((acc, file) => {
            const tag: any = file.tag ?? ''
            if (!acc[tag]) acc[tag] = []
            acc[tag].push(file)
            return acc
        }, {} as Record<string, FileModel[]>)

        const sortedByName = Object.values(groupedByTag).map((files) =>
            files.sort((a, b) => a.name.localeCompare(b.name))
        )

        return sortedByName.flat()
    }

    static getTag = (fileName: string): FileTag => {
        if (/(lesson)/i.test(fileName)) {
            return 'lesson'
        }
        return 'story'
    }

    static getBySimilarName = (
        files: FileModel[],
        name: string
    ): FileModel[] => {
        const fuse = new Fuse(files, {
            keys: ['name'],
            isCaseSensitive: false,
            threshold: 0.2,
        })
        return fuse.search(name).map((item) => item.item)
    }
}

export type FileTag = 'lesson' | 'story'
