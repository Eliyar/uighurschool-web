import { get, ref } from 'firebase/database'

import { Lesson } from '../../../models/Lesson.model'
import { firebaseDb } from '../../firebase.service'

export const getLessons = async () => {
    if (!firebaseDb) {
        throw new Error('Firebase database is not initialized')
    }

    const lessonsRef = ref(firebaseDb, 'lessons')
    const lessonsSnapshot = await get(lessonsRef)

    const lessons: Lesson[] = []
    lessonsSnapshot.forEach((lessonSnapshot) => {
        const lessonObj = lessonSnapshot.val()
        lessons.push(lessonObj)
    })

    return lessons
}
