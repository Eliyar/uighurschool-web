import { Observable, Subject } from 'rxjs'

import { ConfirmationDialogProps } from '../components/common/ConfirmationDialog'
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
    static emit = (classObj?: Class) => {
        eventBus.emit({
            action: OpenClassFormDialog.type,
            payload: {
                classObj,
            },
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

export class OpenSendLessonsDialog {
    static readonly type: string = 'OpenSendLessonsDialog'
    static emit = () => {
        eventBus.emit({
            action: OpenSendLessonsDialog.type,
        })
    }
}

export class OpenConfirmationDialog {
    static readonly type: string = 'OpenConfirmationDialog'
    static emit = (props: Omit<ConfirmationDialogProps, 'open'>) => {
        eventBus.emit({
            action: OpenConfirmationDialog.type,
            payload: props,
        })
    }
}
