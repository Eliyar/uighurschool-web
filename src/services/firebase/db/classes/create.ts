import { ref, set } from 'firebase/database'

import { Class } from '../../../models/Class.model'
import { firebaseDb } from '../../firebase.service'

export const createClass = async (classObj: Class): Promise<void> => {
    return set(ref(firebaseDb, `classes/${classObj.id}`), classObj)
}
