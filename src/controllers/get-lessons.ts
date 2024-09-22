import { firebaseService } from '../services/firebase/firebase.service'
import { Lesson } from '../services/models/Lesson.model'
import { LessonsLoaded } from '../services/store/actions'

export const getLessons = async (): Promise<Lesson[]> => {
    return firebaseService.db.getLessons().then((lessons) => {
        LessonsLoaded.dispatch(lessons)
        return lessons
    })
}
