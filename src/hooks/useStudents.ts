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

    const findClassId = useCallback(
        (studentId: string) => {
            let classId: string | undefined

            studentsMap.forEach((students, _classId) => {
                if (students.some((student) => student.id === studentId)) {
                    classId = _classId
                }
            })

            return classId
        },
        [studentsMap]
    )
    return {
        students,
        getByClassId,
        findClassId,
    }
}
