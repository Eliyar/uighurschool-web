import { Box } from '@mui/material'
import { ReactNode, useCallback } from 'react'

import { OpenConfirmationDialog } from '../../../services/eventbus.service'
import { firebaseService } from '../../../services/firebase/firebase.service'
import { FilesDeleted } from '../../../services/store/actions'
import { Toast } from '../Toast'

interface Props {
    fileId: string
    children: ReactNode
    onDeleted?(): void
}

export const DeleteFile = ({ fileId, children, onDeleted }: Props) => {
    const onClick = useCallback(
        async (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation()

            OpenConfirmationDialog.emit({
                title: 'Deleting lesson',
                message: 'Are you sure you want to remove this lesson?',
                confirmLabel: 'Delete',
                confirmColor: 'error',
                onConfirm: async () => {
                    try {
                        await firebaseService.db.deleteFile(fileId)
                        FilesDeleted.dispatch([fileId])
                    } catch (error) {
                        Toast.error('Error deleting file')
                        console.error('Error deleting file', error)
                    }
                    onDeleted?.()
                },
            })
        },
        [fileId, onDeleted]
    )

    return <Box onClick={onClick}>{children}</Box>
}
