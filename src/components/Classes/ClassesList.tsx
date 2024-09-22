import {
    CameraOutlined,
    Edit,
    ExpandMore,
    InfoOutlined,
    PersonAddOutlined,
} from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'

import { openWheel } from '../../controllers/open-wheel'
import { useClasses } from '../../hooks/useClasses'
import {
    OpenClassFormDialog,
    OpenStudentFormDialog,
} from '../../services/eventbus.service'
import { Button } from '../common/Button'
import { StudentsDataGrid } from './StudentsDataGrid'

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
                <Accordion key={classObj.id} elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                            sx={{ width: '100%', mr: 3 }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography variant="body2" fontWeight={500}>
                                    {classObj.name}
                                </Typography>
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        OpenClassFormDialog.emit(classObj)
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            </Stack>

                            <Stack direction="row" spacing={1}>
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
                </Accordion>
            ))}
        </>
    )
}
