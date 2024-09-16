import { firebaseService } from '../services/firebase/firebase.service'
import { StudentDeleted } from '../services/store/actions'

export const deleteStudent = async (classId: string, studentId: string) => {
    try {
        await firebaseService.db.deleteStudent(studentId)
    } catch (error) {
        console.error(error)
        return
    }

    try {
        const id = `${classId}|${studentId}`
        await firebaseService.db.deleteClassStudent(id)
    } catch (error) {
        console.error(error)
        return
    }

    StudentDeleted.dispatch(classId, studentId)
}
