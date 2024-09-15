import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'
import { StudentsLoaded } from '../services/store/actions'

export const getStudents = async (classes: Class[]): Promise<void> => {
    const [students, classStudents] = await Promise.all([
        firebaseService.db.getStudents(),
        firebaseService.db.getClassStudents(),
    ])

    const classStudentMap = new Map<string, Set<string>>()
    classStudents.forEach((cs) => {
        if (!classStudentMap.has(cs.classId)) {
            classStudentMap.set(cs.classId, new Set())
        }
        classStudentMap.get(cs.classId)!.add(cs.studentId)
    })

    classes.forEach((classObj) => {
        const studentsInClass = students.filter((student) =>
            classStudentMap.get(classObj.id)?.has(student.id)
        )
        StudentsLoaded.dispatch(classObj.id, studentsInClass)
    })
}
