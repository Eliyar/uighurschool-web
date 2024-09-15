import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'
import { ClassUpdated } from '../services/store/actions'

export const updateClass = async (
    classId: string,
    updates: Partial<Class>
): Promise<void> => {
    return firebaseService.db.updateClass(classId, updates).then(() => {
        ClassUpdated.dispatch(classId, updates)
    })
}
