import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'
import { ClassStudent } from '../services/models/ClassStudent'
import { Student } from '../services/models/Student.model'

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
    } catch (error) {
        console.error(error)
        return
    }
}
