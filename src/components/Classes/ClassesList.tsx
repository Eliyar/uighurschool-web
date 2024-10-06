import {
    CameraOutlined,
    Edit,
    InfoOutlined,
    PersonAddOutlined,
} from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Stack,
    styled,
    Typography,
} from '@mui/material'

import Colors from '../../colors'
import { openWheel } from '../../controllers/open-wheel'
import { useClasses } from '../../hooks/useClasses'
import {
    OpenClassFormDialog,
    OpenStudentFormDialog,
} from '../../services/eventbus.service'
import { Button } from '../common/Button'
import { StudentsDataGrid } from './StudentsDataGrid'

const AccordionStyles = styled(Accordion)`
    background-color: ${Colors.CONTROLLER_BACKGROUND};
    border-radius: 6px;
`

export const ClassesList = () => {
    const { classes } = useClasses()

    if (!classes?.length) {
        return (
            <Alert color="warning" icon={<InfoOutlined />}>
                No classes exist
            </Alert>
        )
    }

    return (
        <>
            {classes.map((classObj) => (
                <AccordionStyles key={classObj.id} expanded elevation={0}>
                    <AccordionSummary expandIcon={false}>
                        <Stack
                            spacing={1}
                            sx={{
                                width: '100%',
                                mr: 3,
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                justifyContent: {
                                    xs: 'flex-end',
                                    sm: 'space-between',
                                },
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography variant="h6" fontWeight={500}>
                                    {classObj.name}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="outlined"
                                    label="Edit Class"
                                    startIcon={<Edit />}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        OpenClassFormDialog.emit(classObj)
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    label="Add Student"
                                    startIcon={<PersonAddOutlined />}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        OpenStudentFormDialog.emit(
                                            classObj,
                                            undefined
                                        )
                                    }}
                                />
                                {classObj.wheelsUrl && (
                                    <Button
                                        variant="outlined"
                                        label="Wheels"
                                        startIcon={<CameraOutlined />}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            openWheel(classObj.wheelsUrl!)
                                        }}
                                    />
                                )}
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <StudentsDataGrid classObj={classObj} />
                    </AccordionDetails>
                </AccordionStyles>
            ))}
        </>
    )
}
