import { FileModel } from '../models/File.model'
import { storeService } from './store'

export class Action {
    type!: string
    payload: any
}

export class FilesLoaded extends Action {
    static readonly type: string = '[Files] Loaded'
    files!: FileModel[]

    static dispatch(files: FileModel[]) {
        storeService.dispatch({
            type: FilesLoaded.type,
            payload: {
                files,
            },
        })
    }
}

export class FilesAdded extends Action {
    static readonly type: string = '[Files] Added'
    files!: FileModel[]

    static dispatch(files: FileModel[]) {
        storeService.dispatch({
            type: FilesAdded.type,
            payload: {
                files,
            },
        })
    }
}

export class FilesDeleted extends Action {
    static readonly type: string = '[Files] Deleted'
    fileIds!: string[]

    static dispatch(fileIds: string[]) {
        storeService.dispatch({
            type: FilesDeleted.type,
            payload: {
                fileIds,
            },
        })
    }
}
