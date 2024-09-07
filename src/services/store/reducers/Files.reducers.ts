import { produce } from 'immer'

import { FilesAdded, FilesDeleted, FilesLoaded } from '../actions'
import { State } from '../state'

export const processFilesLoaded = (state: State, action: FilesLoaded) => {
    return produce(state, (draft) => {
        draft.files = action.files
    })
}

export const processFilesAdded = (state: State, action: FilesAdded) => {
    return produce(state, (draft) => {
        draft.files = action.files.concat(draft.files)
    })
}

export const processFilesDeleted = (state: State, action: FilesDeleted) => {
    return produce(state, (draft) => {
        draft.files = draft.files.filter(
            (file) => !action.fileIds.includes(file.id)
        )
    })
}
