import { ref, update } from 'firebase/database'

import { Student } from '../../../models/Student.model'
import { firebaseDb } from '../../firebase.service'

export const updateStudent = async (
    id: string,
    updates: Partial<Student>
): Promise<void> => {
    return update(ref(firebaseDb, `students/${id}`), updates)
}
