import { utilsService } from '../services/firebase/utils.service'
import { httpService } from '../services/http/http.service'
import { FileModel } from '../services/models/File.model'
import { Student } from '../services/models/Student.model'

export const sendLessons = async (payload: {
    students: Student[]
    subject: string
    message: string
    files: FileModel[]
}) => {
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

    return httpService.sendEmail({
        to,
        subject: payload.subject,
        body: payload.message ?? '',
        attachments,
    })
}
