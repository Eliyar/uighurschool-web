import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    styled,
} from '@mui/material'
import { ReactNode } from 'react'

import { Button } from './Button'

export interface ConfirmationDialogProps extends DialogProps {
    title: string
    message: ReactNode | string
    confirmLabel?: string
    confirmColor?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
    cancelLabel?: string
    cancelColor?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
    onConfirm(): void
    onCancel?(): void
}

const Styles = styled(Dialog)``

export const ConfirmationDialog = ({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    confirmColor = 'primary',
    cancelLabel = 'Cancel',
    cancelColor = 'secondary',
    onConfirm,
    onCancel,
    onClose,
    ...dialogProps
}: ConfirmationDialogProps) => {
    return (
        <Styles
            open={Boolean(open)}
            fullWidth
            maxWidth="xs"
            onClose={onClose}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.10)',
                    },
                },
            }}
            {...dialogProps}
        >
            <DialogTitle>{title}</DialogTitle>

            <DialogContent sx={{ px: 2 }}>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    label={cancelLabel}
                    onClick={(event) => {
                        onCancel?.()
                        onClose?.(event, 'escapeKeyDown')
                    }}
                    color={cancelColor}
                />
                <Button
                    label={confirmLabel}
                    onClick={(event) => {
                        onConfirm()
                        onClose?.(event, 'escapeKeyDown')
                    }}
                    color={confirmColor}
                />
            </DialogActions>
        </Styles>
    )
}
