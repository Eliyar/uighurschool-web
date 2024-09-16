import { produce } from 'immer'

import { StudentAdded, StudentsLoaded, StudentUpdated } from '../actions'
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

export const processStudentUpdated = (state: State, action: StudentUpdated) => {
    const { classId, studentId, updates } = action
    return produce(state, (draft) => {
        const students = draft.studentsMap.get(classId)
        if (students) {
            const student = students.find((s) => s.id === studentId)
            if (student) {
                Object.assign(student, updates)
            }
        }
    })
}
