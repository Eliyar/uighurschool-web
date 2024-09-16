import { ref, remove } from 'firebase/database'

import { firebaseDb } from '../../firebase.service'

export const deleteClassStudent = async (id: string) => {
    return remove(ref(firebaseDb, `classStudents/${id}`))
}
