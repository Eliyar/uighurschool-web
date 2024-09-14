import { firebaseService } from '../services/firebase/firebase.service'

export const getClasses = () => {
    return firebaseService.db.getClasses()
}
