import { ClassesLoaded, FilesAdded, FilesDeleted, FilesLoaded } from './actions'
import { processClassesLoaded } from './reducers/Classes.reducers'
import {
    processFilesAdded,
    processFilesDeleted,
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

        case FilesDeleted.type:
            return processFilesDeleted(state, payload)

        case ClassesLoaded.type:
            return processClassesLoaded(state, payload)
    }

    return state
}
