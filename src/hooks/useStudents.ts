import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { State } from '../services/store/state'

export const useStudents = () => {
    const studentsMap = useSelector((state: State) => state.studentsMap)

    const getByClassId = useCallback(
        (classId: string) => {
            return studentsMap.get(classId)
        },
        [studentsMap]
    )

    return {
        getByClassId,
    }
}
