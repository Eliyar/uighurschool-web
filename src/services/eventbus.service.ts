import { Observable, Subject } from 'rxjs'

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
