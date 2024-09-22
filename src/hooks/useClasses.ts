import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Class } from '../services/models/Class.model'
import { State } from '../services/store/state'

export const useClasses = () => {
    const classes = useSelector((state: State) => state.classes)

    const getBySimilarName = useCallback(
        (name: string) => {
            return Class.getByName(classes, name)
        },
        [classes]
    )

    const getClass = useCallback(
        (classId: string) => {
            return classes.find((classObj) => classObj.id === classId)
        },
        [classes]
    )

    return {
        classes,
        getBySimilarName,
        getClass,
    }
}
