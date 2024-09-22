import { utilsService } from '../firebase/utils.service'

export class Lesson {
    id!: string
    name!: string
    classId: string | null
    fileIds!: string[]
    createdAt!: string

    constructor(name: string, classId: string | undefined, fileIds: string[]) {
        this.id = utilsService.uuid()
        this.name = name
        this.classId = classId ?? null
        this.fileIds = fileIds
        this.createdAt = new Date().toISOString()
    }
}
