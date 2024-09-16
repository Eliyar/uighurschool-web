export class ClassStudent {
    id!: string
    classId!: string
    studentId!: string

    constructor(classId: string, studentId: string) {
        this.id = `${classId}|${studentId}`
        this.classId = classId
        this.studentId = studentId
    }
}
