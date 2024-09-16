import { Close, PersonAddOutlined } from '@mui/icons-material'
import { Alert, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { useCallback, useMemo } from 'react'

import { deleteStudent } from '../../controllers/delete-student'
import { updateStudent } from '../../controllers/update-student'
import { useStudents } from '../../hooks/useStudents'
import { OpenStudentFormDialog } from '../../services/eventbus.service'
import { Class } from '../../services/models/Class.model'
import { Student } from '../../services/models/Student.model'
import { validationService } from '../../services/validation.service'
import { Button } from '../common/Button'

interface Props {
    classObj: Class
}

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        disableColumnMenu: true,
        editable: true,
    },
    {
        field: 'uighurName',
        headerName: 'Uighur Name',
        flex: 1,
        disableColumnMenu: true,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        disableColumnMenu: true,
        editable: true,
    },
    {
        field: 'action',
        headerName: '',
        type: 'actions',
        align: 'right',
        getActions: (params) => [
            <Button
                key="delete"
                variant="outlined"
                color="error"
                label="Remove Student"
                startIcon={<Close />}
                onClick={async (event) => {
                    event.stopPropagation()

                    // TODO: display confirmation dialog

                    await deleteStudent(params.row.classId, params.row.id)

                    // TODO: display toast message
                }}
            />,
        ],
        flex: 1,
        disableColumnMenu: true,
    },
]

export const StudentsDataGrid = ({ classObj }: Props) => {
    const { getByClassId } = useStudents()

    const students = useMemo(
        () => getByClassId(classObj.id),
        [classObj.id, getByClassId]
    )

    const rows: GridRowsProp = useMemo(
        () =>
            students?.map((student) => ({
                id: student.id,
                name: student.name,
                uighurName: student.uighurName ?? '',
                email: student.email,
                classId: classObj.id,
            })) ?? [],
        [students, classObj.id]
    )

    const onUpdate = useCallback(
        async (studentId: string, updates: Partial<Student>) => {
            try {
                await updateStudent(classObj.id, studentId, updates)
            } catch (error) {
                console.error(error)
            }

            // TODO: display toast message
        },
        [classObj.id]
    )

    if (!students?.length) {
        return (
            <Alert severity="warning">
                <Stack spacing={2}>
                    <Typography>No students exist</Typography>
                    <Button
                        variant="outlined"
                        label="Add Student"
                        startIcon={<PersonAddOutlined />}
                        onClick={(event) => {
                            event.stopPropagation()
                            OpenStudentFormDialog.emit(classObj, undefined)
                        }}
                    />
                </Stack>
            </Alert>
        )
    }

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pagination={undefined}
            hideFooter
            editMode="row"
            processRowUpdate={(updatedRow, originalRow) => {
                if (updatedRow && 'id' in updatedRow) {
                    const isEmailValid = validationService.isEmail(
                        updatedRow.email
                    )
                    if (!isEmailValid) {
                        // TODO: display toast message
                        return originalRow
                    }

                    onUpdate(updatedRow.id, updatedRow as Partial<Student>)
                    return updatedRow
                }
                return originalRow
            }}
            onProcessRowUpdateError={(error) => {
                console.error(error)
            }}
        />
    )
}
