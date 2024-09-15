import { produce } from 'immer'

import { StudentsLoaded } from '../actions'
import { State } from '../state'

export const processStudentsLoaded = (state: State, action: StudentsLoaded) => {
    const { classId, students } = action
    return produce(state, (draft) => {
        draft.studentsMap.set(classId, students)
    })
}
