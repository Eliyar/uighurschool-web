import { Box } from '@mui/material'
import { ReactNode, useCallback } from 'react'

import { firebaseService } from '../../../services/firebase/firebase.service'
import { FileDeleted } from '../../../services/store/actions'

interface Props {
    fileId: string
    children: ReactNode
}

export const DeleteFile = ({ fileId, children }: Props) => {
    const onClick = useCallback(async () => {
        // TODO: display confirmation dialog

        try {
            await firebaseService.db.deleteFile(fileId)
            FileDeleted.dispatch(fileId)
        } catch (error) {
            // TODO: display error toast
            console.error('Error deleting file', error)
        }
    }, [fileId])

    return <Box onClick={onClick}>{children}</Box>
}
