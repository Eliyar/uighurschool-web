import {
    Dialog,
    DialogContent,
    DialogProps,
    Stack,
    styled,
    Typography,
} from '@mui/material'

import { Class } from '../../../services/models/Class.model'
import { Student } from '../../../services/models/Student.model'
import { DialogPaperComponent, DraggableDialogTitleStyles } from '../Dialog'
import { Form } from './Form'
import { LocalContextProvider } from './hooks/useLocalContext'

export type StudentFormDialogProps = {
    student?: Student
    classObj: Class
} & DialogProps

const Styles = styled(Dialog)``

export const StudentFormDialog = ({
    open,
    student,
    classObj,
    onClose,
}: StudentFormDialogProps) => {
    const dialogId = 'draggable-studentform-dialog-title'

    const isUpdating = !!student

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
                    {isUpdating ? (
                        'Update Student'
                    ) : (
                        <>
                            {'Add Student to '}
                            <Typography
                                variant="inherit"
                                fontWeight={800}
                                component="span"
                            >
                                {classObj.name}
                            </Typography>
                        </>
                    )}
                </DraggableDialogTitleStyles>

                <LocalContextProvider student={student} classObj={classObj}>
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
