import { produce } from 'immer'

import { Lesson } from '../../models/Lesson.model'
import { LessonAdded, LessonsLoaded } from '../actions'
import { State } from '../state'

export const processLessonsLoaded = (
    state: State,
    action: LessonsLoaded
): State => {
    return produce(state, (draft) => {
        const sortedLessons = Lesson.sort(action.lessons)
        draft.lessons = sortedLessons
    })
}

export const processLessonAdded = (
    state: State,
    action: LessonAdded
): State => {
    return produce(state, (draft) => {
        draft.lessons.unshift(action.lesson)
    })
}
