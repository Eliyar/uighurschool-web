import { Observable, Subject } from 'rxjs'

import { Class } from './models/Class.model'
import { Student } from './models/Student.model'

export interface EventBusData {
    action: any
    payload?: any
}

const subject: Subject<EventBusData> = new Subject()

export const eventBus = {
    emit(event: EventBusData) {
        subject.next(event)
    },

    getObservable: (): Observable<EventBusData> => subject.asObservable(),
}

export class OpenFileUploaderDialog {
    static readonly type: string = 'OpenFileUploaderDialog'
    static emit = () => {
        eventBus.emit({
            action: OpenFileUploaderDialog.type,
        })
    }
}

export class OpenClassFormDialog {
    static readonly type: string = 'OpenClassFormDialog'
    static emit = () => {
        eventBus.emit({
            action: OpenClassFormDialog.type,
        })
    }
}

export class OpenStudentFormDialog {
    static readonly type: string = 'OpenStudentFormDialog'
    static emit = (classObj: Class, student?: Student) => {
        eventBus.emit({
            action: OpenStudentFormDialog.type,
            payload: {
                classObj,
                student,
            },
        })
    }
}
