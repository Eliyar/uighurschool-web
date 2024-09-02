import { FileDeleted, FilesLoaded } from './actions'
import {
    processFileDeleted,
    processFilesLoaded,
} from './reducers/Files.reducers'
import { initialState, State } from './state'

export const reducer = (state: State = initialState, action: any) => {
    const payload = action.payload

    switch (action.type) {
        case FilesLoaded.type:
            return processFilesLoaded(state, payload)

        case FileDeleted.type:
            return processFileDeleted(state, payload)
    }

    return state
}
