import { utilsService } from '../firebase/utils.service'

export class ClassStudent {
    id!: string
    classId!: string
    studentId!: string

    constructor(classId: string, studentId: string) {
        this.id = utilsService.uuid()
        this.classId = classId
        this.studentId = studentId
    }
}
