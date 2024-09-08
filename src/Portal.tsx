import { useEffect, useMemo, useState } from 'react'

import {
    FileUploaderDialog,
    FileUploaderDialogProps,
} from './components/common/FileUploaderDialog/FileUploaderDialog'
import {
    eventBus,
    EventBusData,
    OpenFileUploaderDialog,
} from './services/eventbus.service'

export const Portal = () => {
    const [fileUploaderDialogProps, setFileUploaderDialogProps] =
        useState<FileUploaderDialogProps | null>(null)

    const diaglogEventsRef = useMemo(() => {
        return {
            [OpenFileUploaderDialog.type]: setFileUploaderDialogProps,
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
