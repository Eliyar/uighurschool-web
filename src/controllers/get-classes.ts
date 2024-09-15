import { firebaseService } from '../services/firebase/firebase.service'
import { Class } from '../services/models/Class.model'
import { ClassesLoaded } from '../services/store/actions'

export const getClasses = async (): Promise<Class[]> => {
    return firebaseService.db.getClasses().then((classes) => {
        ClassesLoaded.dispatch(classes)
        return classes
    })
}
