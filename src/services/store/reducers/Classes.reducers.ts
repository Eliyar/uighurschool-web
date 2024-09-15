import { produce } from 'immer'

import { ClassesLoaded } from '../actions'
import { State } from '../state'

export const processClassesLoaded = (
    state: State,
    action: ClassesLoaded
): State => {
    return produce(state, (draft) => {
        draft.classes = action.classes
    })
}
