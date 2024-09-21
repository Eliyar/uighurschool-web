import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Student } from '../services/models/Student.model'
import { State } from '../services/store/state'

export const useStudents = () => {
    const studentsMap = useSelector((state: State) => state.studentsMap)

    const students = useMemo(() => {
        const _students: Student[] = []

        studentsMap.forEach((students) => {
            _students.push(...students)
        })

        return _students
    }, [studentsMap])

    const getByClassId = useCallback(
        (classId: string) => {
            return studentsMap.get(classId) ?? []
        },
        [studentsMap]
    )

    return {
        students,
        getByClassId,
    }
}
