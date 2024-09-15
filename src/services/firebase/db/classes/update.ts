import { ref, update } from 'firebase/database'

import { Class } from '../../../models/Class.model'
import { firebaseDb } from '../../firebase.service'

export const updateClass = async (
    id: string,
    updates: Partial<Class>
): Promise<void> => {
    return update(ref(firebaseDb, `classes/${id}`), updates)
}
