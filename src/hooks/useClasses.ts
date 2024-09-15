import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Class } from '../services/models/Class.model'
import { State } from '../services/store/state'

export const useClasses = () => {
    const classes = useSelector((state: State) => state.classes)

    const getBySimilarName = useCallback(
        (name: string) => {
            const _classes = Class.getByName(classes, name)

            console.log({
                classes,
                _classes,
                name,
            })

            return _classes
        },
        [classes]
    )

    return {
        classes,
        getBySimilarName,
    }
}
