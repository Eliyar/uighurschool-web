import { firebaseService } from '../services/firebase/firebase.service'

export const getClassStudents = () => {
    return firebaseService.db.getStudents()
}
