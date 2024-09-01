import { produce } from 'immer'

import { FilesLoaded } from '../actions'
import { State } from '../state'

export const processFilesLoaded = (state: State, action: FilesLoaded) => {
    return produce(state, (draft) => {
        draft.files = action.files
    })
}
