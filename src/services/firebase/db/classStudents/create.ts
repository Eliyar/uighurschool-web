import { ref, set } from 'firebase/database'

import { ClassStudent } from '../../../models/ClassStudent'
import { firebaseDb } from '../../firebase.service'

export const createClassStudent = async (
    classStudent: ClassStudent
): Promise<void> => {
    return set(
        ref(firebaseDb, `classStudents/${classStudent.id}`),
        classStudent
    )
}
