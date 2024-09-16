import { ref, remove } from 'firebase/database'

import { firebaseDb } from '../../firebase.service'

export const deleteStudent = async (id: string) => {
    return remove(ref(firebaseDb, `students/${id}`))
}
