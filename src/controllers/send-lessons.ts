import { createLesson } from '../services/firebase/db/lessons/create'
import { firebaseService } from '../services/firebase/firebase.service'
import { utilsService } from '../services/firebase/utils.service'
import { FileModel } from '../services/models/File.model'
import { Lesson } from '../services/models/Lesson.model'
import { Student } from '../services/models/Student.model'
import { LessonAdded } from '../services/store/actions'

export const sendLessons = async (payload: {
    students: Student[]
    subject: string
    message: string
    files: FileModel[]
    classId?: string
}): Promise<Lesson> => {
    const uniqueStudents = payload.students.filter(
        (student, index, self) =>
            index === self.findIndex((t) => t.email === student.email)
    )
    const to = uniqueStudents.map((student) => student.email).join(',')

    const attachments = await Promise.all(
        payload.files.map((file) =>
            utilsService.getFileFromUrl(file.name, file.downloadUrl)
        )
    )

    return firebaseService.functions
        .sendEmail({
            to,
            subject: payload.subject,
            body: payload.message ?? '',
            attachments,
        })
        .then(async () => {
            const lesson = new Lesson(
                payload.subject,
                payload.classId,
                payload.files?.map((file) => file.id) ?? []
            )
            return createLesson(lesson).then(() => {
                LessonAdded.dispatch(lesson)
                return lesson
            })
        })
}
