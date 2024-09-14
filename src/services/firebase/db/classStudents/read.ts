import { get, ref } from 'firebase/database'

import { ClassStudent } from '../../../models/ClassStudent'
import { firebaseDb } from '../../firebase.service'

export const getClassStudents = async () => {
    if (!firebaseDb) {
        throw new Error('Firebase database is not initialized')
    }

    const classStudentsRef = ref(firebaseDb, 'classStudents')
    const classStudentsSnapshot = await get(classStudentsRef)

    const classStudents: ClassStudent[] = []
    classStudentsSnapshot.forEach((classSnapshot) => {
        const classObj = classSnapshot.val()
        classStudents.push(classObj)
    })

    return classStudents
}
