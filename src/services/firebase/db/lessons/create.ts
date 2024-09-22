import { ref, set } from 'firebase/database'

import { Lesson } from '../../../models/Lesson.model'
import { firebaseDb } from '../../firebase.service'

export const createLesson = async (lesson: Lesson): Promise<void> => {
    return set(ref(firebaseDb, `lessons/${lesson.id}`), lesson)
}
