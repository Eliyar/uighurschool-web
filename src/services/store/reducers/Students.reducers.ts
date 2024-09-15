import { produce } from 'immer'

import { StudentAdded, StudentsLoaded } from '../actions'
import { State } from '../state'

export const processStudentsLoaded = (state: State, action: StudentsLoaded) => {
    const { classId, students } = action
    return produce(state, (draft) => {
        draft.studentsMap.set(classId, students)
    })
}

export const processStudentAdded = (state: State, action: StudentAdded) => {
    const { classId, student } = action
    return produce(state, (draft) => {
        const students = draft.studentsMap.get(classId)
        if (students) {
            students.push(student)
        }
    })
}
