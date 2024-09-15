import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Class } from '../services/models/Class.model'
import { State } from '../services/store/state'

export const useClasses = () => {
    const classes = useSelector((state: State) => state.classes)

    const getBySimilarName = useCallback(
        (name: string) => {
            return Class.getBySimilarName(classes, name)
        },
        [classes]
    )

    return {
        classes,
        getBySimilarName,
    }
}
