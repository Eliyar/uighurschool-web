import { useEffect, useMemo, useState } from 'react'

import {
    ClassFormDialog,
    ClassFormDialogProps,
} from './components/common/ClassFormDialog/ClassFormDialog'
import {
    FileUploaderDialog,
    FileUploaderDialogProps,
} from './components/common/FileUploaderDialog/FileUploaderDialog'
import {
    eventBus,
    EventBusData,
    OpenClassFormDialog,
    OpenFileUploaderDialog,
} from './services/eventbus.service'

export const Portal = () => {
    const [fileUploaderDialogProps, setFileUploaderDialogProps] =
        useState<FileUploaderDialogProps | null>(null)
    const [classFormDialogProps, setClassFormDialogProps] =
        useState<ClassFormDialogProps | null>(null)

    const diaglogEventsRef = useMemo(() => {
        return {
            [OpenFileUploaderDialog.type]: setFileUploaderDialogProps,
            [OpenClassFormDialog.type]: setClassFormDialogProps, // Add this line
        }
    }, [])

    useEffect(() => {
        const subscription = eventBus
            .getObservable()
            .subscribe((event: EventBusData) => {
                const funcRef = diaglogEventsRef[event.action as any]
                resolveDialogEvent(event, funcRef)
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [diaglogEventsRef])

    return (
        <>
            {fileUploaderDialogProps && (
                <FileUploaderDialog {...fileUploaderDialogProps} />
            )}
            {classFormDialogProps && (
                <ClassFormDialog {...classFormDialogProps} />
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
