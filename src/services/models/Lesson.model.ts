import moment from 'moment'

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

    static groupByDate(lessons: Lesson[]) {
        return lessons.reduce((acc: { [key: string]: Lesson[] }, lesson) => {
            const date = moment(lesson.createdAt).format('YYYY-MM-DD')
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(lesson)
            return acc
        }, {})
    }
}
