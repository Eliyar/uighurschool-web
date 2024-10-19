import { useEffect, useMemo, useState } from 'react'

import {
    ClassFormDialog,
    ClassFormDialogProps,
} from './components/common/ClassFormDialog/ClassFormDialog'
import {
    ConfirmationDialog,
    ConfirmationDialogProps,
} from './components/common/ConfirmationDialog'
import {
    FileUploaderDialog,
    FileUploaderDialogProps,
} from './components/common/FileUploaderDialog/FileUploaderDialog'
import {
    SendLessonsDialog,
    SendLessonsDialogProps,
} from './components/common/SendLessonsDialog/SendLessonsDialog'
import {
    StudentFormDialog,
    StudentFormDialogProps,
} from './components/common/StudentFormDialog/StudentFormDialog'
import { ToastContainer } from './components/common/Toast'
import {
    eventBus,
    EventBusData,
    OpenClassFormDialog,
    OpenConfirmationDialog,
    OpenFileUploaderDialog,
    OpenSendLessonsDialog,
    OpenStudentFormDialog,
} from './services/eventbus.service'

export const Portal = () => {
    const [fileUploaderDialogProps, setFileUploaderDialogProps] =
        useState<FileUploaderDialogProps | null>(null)
    const [classFormDialogProps, setClassFormDialogProps] =
        useState<ClassFormDialogProps | null>(null)
    const [studentFormDialogProps, setStudentFormDialogProps] =
        useState<StudentFormDialogProps | null>(null)
    const [sendLessonsDialogProps, setSendLessonsDialogProps] =
        useState<SendLessonsDialogProps | null>(null)
    const [confirmationDialogProps, setConfirmationDialogProps] =
        useState<ConfirmationDialogProps | null>(null)

    const dialogEventsRef = useMemo(() => {
        return {
            [OpenFileUploaderDialog.type]: setFileUploaderDialogProps,
            [OpenClassFormDialog.type]: setClassFormDialogProps,
            [OpenStudentFormDialog.type]: setStudentFormDialogProps,
            [OpenSendLessonsDialog.type]: setSendLessonsDialogProps,
            [OpenConfirmationDialog.type]: setConfirmationDialogProps,
        }
    }, [])

    useEffect(() => {
        const subscription = eventBus
            .getObservable()
            .subscribe((event: EventBusData) => {
                const funcRef = dialogEventsRef[event.action as any]
                resolveDialogEvent(event, funcRef)
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [dialogEventsRef])

    return (
        <>
            <ToastContainer />

            {fileUploaderDialogProps && (
                <FileUploaderDialog {...fileUploaderDialogProps} />
            )}
            {classFormDialogProps && (
                <ClassFormDialog {...classFormDialogProps} />
            )}
            {studentFormDialogProps && (
                <StudentFormDialog {...studentFormDialogProps} />
            )}
            {sendLessonsDialogProps && (
                <SendLessonsDialog {...sendLessonsDialogProps} />
            )}
            {confirmationDialogProps && (
                <ConfirmationDialog {...confirmationDialogProps} />
            )}
        </>
    )
}

const resolveDialogEvent = (
    event: EventBusData,
    setterRef?: (props: any) => void
) => {
    if (!setterRef) {
        return
    }
    setterRef({
        ...event.payload,
        open: true,
        onClose: () => {
            setterRef(null)
        },
    })
}
