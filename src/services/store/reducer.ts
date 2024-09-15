import {
    ClassAdded,
    ClassesLoaded,
    ClassUpdated,
    FilesAdded,
    FilesDeleted,
    FilesLoaded,
    StudentAdded,
    StudentsLoaded,
} from './actions'
import {
    processClassAdded,
    processClassesLoaded,
    processClassUpdated,
} from './reducers/Classes.reducers'
import {
    processFilesAdded,
    processFilesDeleted,
    processFilesLoaded,
} from './reducers/Files.reducers'
import {
    processStudentAdded,
    processStudentsLoaded,
} from './reducers/Students.reducers'
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

        case ClassAdded.type:
            return processClassAdded(state, payload)

        case ClassUpdated.type:
            return processClassUpdated(state, payload)

        case StudentsLoaded.type:
            return processStudentsLoaded(state, payload)

        case StudentAdded.type:
            return processStudentAdded(state, payload)
    }

    return state
}
