import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'

export const createClass = (classObj: Class) => {
    return firebaseService.db.createClass(classObj)
}
