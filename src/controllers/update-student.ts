import { firebaseService } from '../services/firebase/firebase.service'
import { Student } from '../services/models/Student.model'
import { StudentUpdated } from '../services/store/actions'

export const updateStudent = async (
    classId: string,
    studentId: string,
    updates: Partial<Student>
): Promise<void> => {
    return firebaseService.db.updateStudent(studentId, updates).then(() => {
        StudentUpdated.dispatch(classId, studentId, updates)
    })
}
