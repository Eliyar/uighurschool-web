import { firebaseService } from '../services/firebase/firebase.service'

export const getStudents = () => {
    return firebaseService.db.getStudents()
}
