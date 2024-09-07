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

export class FileDeleted extends Action {
    static readonly type: string = '[Files] Deleted'
    fileId!: string

    static dispatch(fileId: string) {
        storeService.dispatch({
            type: FileDeleted.type,
            payload: {
                fileId,
            },
        })
    }
}
