import {
    Dialog,
    DialogContent,
    DialogProps,
    Stack,
    styled,
} from '@mui/material'

import { FileUploader } from '../../FileUploader/FileUploader'
import { DialogPaperComponent, DraggableDialogTitleStyles } from '../Dialog'

export type FileUploaderDialogProps = DialogProps

const Styles = styled(Dialog)``

export const FileUploaderDialog = ({
    open,
    onClose,
}: FileUploaderDialogProps) => {
    const dialogId = 'draggable-fileuploader-dialog-title'

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
                    Upload Lessons
                </DraggableDialogTitleStyles>

                <DialogContent sx={{ p: 2 }}>
                    <FileUploader
                        onUploaded={() => {
                            onClose?.({}, 'backdropClick')
                        }}
                        onClose={onClose}
                    />
                </DialogContent>
            </Stack>
        </Styles>
    )
}
