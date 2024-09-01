import { FilesLoaded } from './actions'
import { processFilesLoaded } from './reducers/Files.reducers'
import { initialState, State } from './state'

export const reducer = (state: State = initialState, action: any) => {
    const payload = action.payload

    switch (action.type) {
        case FilesLoaded.type:
            return processFilesLoaded(state, payload)
    }

    return state
}
