import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'
import { ClassStudent } from '../services/models/ClassStudent'
import { Student } from '../services/models/Student.model'
import { StudentAdded } from '../services/store/actions'

export const createStudent = async (student: Student, classObj: Class) => {
    try {
        await firebaseService.db.createStudent(student)
    } catch (error) {
        console.error(error)
        return
    }

    try {
        const classStudent = new ClassStudent(classObj.id, student.id)
        await firebaseService.db.createClassStudent(classStudent)
        StudentAdded.dispatch(classObj.id, student)
    } catch (error) {
        console.error(error)
        return
    }
}
