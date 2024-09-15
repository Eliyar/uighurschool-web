import {
    Box,
    Dialog,
    DialogContent,
    DialogProps,
    Stack,
    styled,
} from '@mui/material'

import { DialogPaperComponent, DraggableDialogTitleStyles } from '../Dialog'

export type ClassFormDialogProps = DialogProps

const Styles = styled(Dialog)``

export const ClassFormDialog = ({ open, onClose }: ClassFormDialogProps) => {
    const dialogId = 'draggable-classform-dialog-title'

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
                    ClassFormDialog
                </DraggableDialogTitleStyles>

                <DialogContent sx={{ p: 2 }}>
                    <Box>ClassForm</Box>
                </DialogContent>
            </Stack>
        </Styles>
    )
}
