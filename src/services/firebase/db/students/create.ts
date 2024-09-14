import { ref, set } from 'firebase/database'

import { Student } from '../../../models/Student.model'
import { firebaseDb } from '../../firebase.service'

export const createStudent = async (studuent: Student): Promise<void> => {
    return set(ref(firebaseDb, `students/${studuent.id}`), studuent)
}
