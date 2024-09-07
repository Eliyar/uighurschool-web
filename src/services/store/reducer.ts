import { FileDeleted, FilesAdded, FilesLoaded } from './actions'
import {
    processFileDeleted,
    processFilesAdded,
    processFilesLoaded,
} from './reducers/Files.reducers'
import { initialState, State } from './state'

export const reducer = (state: State = initialState, action: any) => {
    const payload = action.payload

    switch (action.type) {
        case FilesLoaded.type:
            return processFilesLoaded(state, payload)

        case FilesAdded.type:
            return processFilesAdded(state, payload)

        case FileDeleted.type:
            return processFileDeleted(state, payload)
    }

    return state
}
