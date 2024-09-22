import { produce } from 'immer'

import { LessonAdded, LessonsLoaded } from '../actions'
import { State } from '../state'

export const processLessonsLoaded = (
    state: State,
    action: LessonsLoaded
): State => {
    return produce(state, (draft) => {
        draft.lessons = action.lessons
    })
}

export const processLessonAdded = (
    state: State,
    action: LessonAdded
): State => {
    return produce(state, (draft) => {
        draft.lessons.push(action.lesson)
    })
}
