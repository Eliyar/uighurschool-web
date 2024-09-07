import { produce } from 'immer'

import { FileDeleted, FilesAdded, FilesLoaded } from '../actions'
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

export const processFileDeleted = (state: State, action: FileDeleted) => {
    return produce(state, (draft) => {
        draft.files = draft.files.filter((file) => file.id !== action.fileId)
    })
}
