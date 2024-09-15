import { produce } from 'immer'

import { ClassAdded, ClassesLoaded, ClassUpdated } from '../actions'
import { State } from '../state'

export const processClassesLoaded = (
    state: State,
    action: ClassesLoaded
): State => {
    return produce(state, (draft) => {
        draft.classes = action.classes
    })
}

export const processClassAdded = (state: State, action: ClassAdded): State => {
    return produce(state, (draft) => {
        draft.classes.push(action.classObj)
    })
}

export const processClassUpdated = (
    state: State,
    action: ClassUpdated
): State => {
    return produce(state, (draft) => {
        const index = draft.classes.findIndex((c) => c.id === action.classId)
        if (index !== -1) {
            draft.classes[index] = {
                ...draft.classes[index],
                ...action.updates,
            }
        }
    })
}
