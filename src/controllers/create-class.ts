import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'
import { ClassAdded } from '../services/store/actions'

export const createClass = async (classObj: Class): Promise<void> => {
    return firebaseService.db.createClass(classObj).then(() => {
        ClassAdded.dispatch(classObj)
    })
}
