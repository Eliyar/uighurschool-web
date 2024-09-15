import { DialogActions } from '@mui/material'
import { ReactNode } from 'react'

import { Button } from './Button'

interface Props {
    actionNode?: ReactNode
    cancelLabel?: string
    onClose?: (
        event: React.MouseEvent<HTMLButtonElement>,
        reason: 'backdropClick' | 'escapeKeyDown'
    ) => void
}

export const DialogFooter = ({ actionNode, cancelLabel, onClose }: Props) => {
    return (
        <DialogActions
            sx={{ justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}
        >
            {actionNode}
            <Button
                color="secondary"
                label={cancelLabel ?? 'Close'}
                onClick={(event) => {
                    onClose?.(event, 'escapeKeyDown')
                }}
            />
        </DialogActions>
    )
}
