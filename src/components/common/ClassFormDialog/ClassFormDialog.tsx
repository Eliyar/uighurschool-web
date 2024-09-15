import {
    Dialog,
    DialogContent,
    DialogProps,
    Stack,
    styled,
} from '@mui/material'

import { Class } from '../../../services/models/Class.model'
import { DialogPaperComponent, DraggableDialogTitleStyles } from '../Dialog'
import { Form } from './Form'
import { LocalContextProvider } from './hooks/useLocalContext'

export type ClassFormDialogProps = {
    classObj?: Class
} & DialogProps

const Styles = styled(Dialog)``

export const ClassFormDialog = ({
    open,
    classObj,
    onClose,
}: ClassFormDialogProps) => {
    const dialogId = 'draggable-classform-dialog-title'

    const isUpdating = !!classObj

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
                    {isUpdating ? 'Update Class' : 'Create Class'}
                </DraggableDialogTitleStyles>

                <LocalContextProvider classObj={classObj}>
                    <DialogContent sx={{ p: 2 }}>
                        <Form
                            isUpdating={isUpdating}
                            onClose={onClose}
                            sx={{ mt: 2 }}
                        />
                    </DialogContent>
                </LocalContextProvider>
            </Stack>
        </Styles>
    )
}
