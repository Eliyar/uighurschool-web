import { get, ref } from 'firebase/database'

import { Student } from '../../../models/Student.model'
import { firebaseDb } from '../../firebase.service'

export const getStudents = async () => {
    if (!firebaseDb) {
        throw new Error('Firebase database is not initialized')
    }

    const studentsRef = ref(firebaseDb, 'students')
    const studentsSnapshot = await get(studentsRef)

    let students: Student[] = []
    studentsSnapshot.forEach((classSnapshot) => {
        const classObj = classSnapshot.val()
        students.push(classObj)
    })

    // Sort students by name
    students = students.sort(Student.sortByName)

    return students
}
