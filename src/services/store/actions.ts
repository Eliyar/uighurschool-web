import { Class } from '../models/Class.model'
import { FileModel } from '../models/File.model'
import { Student } from '../models/Student.model'
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

export class ClassesLoaded extends Action {
    static readonly type: string = '[Classes] Loaded'
    classes!: Class[]

    static dispatch(classes: Class[]) {
        storeService.dispatch({
            type: ClassesLoaded.type,
            payload: {
                classes,
            },
        })
    }
}

export class ClassAdded extends Action {
    static readonly type: string = '[Classes] Added'
    classObj!: Class

    static dispatch(classObj: Class) {
        storeService.dispatch({
            type: ClassAdded.type,
            payload: {
                classObj,
            },
        })
    }
}

export class ClassUpdated extends Action {
    static readonly type: string = '[Classes] Updated'
    classId!: string
    updates!: Partial<Class>

    static dispatch(classId: string, updates: Partial<Class>) {
        storeService.dispatch({
            type: ClassUpdated.type,
            payload: {
                classId,
                updates,
            },
        })
    }
}

export class StudentsLoaded extends Action {
    static readonly type: string = '[Students] Loaded'
    classId!: string
    students!: Student[]

    static dispatch(classId: string, students: Student[]) {
        storeService.dispatch({
            type: StudentsLoaded.type,
            payload: {
                classId,
                students,
            },
        })
    }
}
