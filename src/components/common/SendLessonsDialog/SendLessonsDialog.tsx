import {
    Dialog,
    DialogContent,
    DialogProps,
    Stack,
    styled,
} from '@mui/material'

import { DialogPaperComponent, DraggableDialogTitleStyles } from '../Dialog'
import { Form } from './Form'
import { LocalContextProvider } from './hooks/useLocalContext'

export type SendLessonsDialogProps = DialogProps

const Styles = styled(Dialog)``

export const SendLessonsDialog = ({
    open,
    onClose,
}: SendLessonsDialogProps) => {
    const dialogId = 'draggable-sendlessons-dialog-title'

    return (
        <Styles
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            PaperComponent={(props) => (
                <DialogPaperComponent
                    dragHandleId={`#${dialogId}`}
                    {...props}
                />
            )}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.10)',
                    },
                },
            }}
        >
            <Stack spacing={2}>
                <DraggableDialogTitleStyles id={dialogId}>
                    Send Lessons
                </DraggableDialogTitleStyles>

                <LocalContextProvider>
                    <DialogContent sx={{ p: 2 }}>
                        <Form onClose={onClose} sx={{ mt: 2 }} />
                    </DialogContent>
                </LocalContextProvider>
            </Stack>
        </Styles>
    )
}
