import { Close, PersonAddOutlined } from '@mui/icons-material'
import { Alert, Stack, styled, Typography } from '@mui/material'
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
import { Toast } from '../common/Toast'

interface Props {
    classObj: Class
}

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
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
                label="Remove"
                startIcon={<Close />}
                onClick={async (event) => {
                    event.stopPropagation()

                    // TODO: display confirmation dialog

                    await deleteStudent(params.row.classId, params.row.id)

                    Toast.success('Student removed')
                }}
                sx={{ px: 1, py: 0.5, height: 32 }}
            />,
        ],
        flex: 1,
        disableColumnMenu: true,
    },
]

const DatagridStyles = styled(DataGrid)`
    background-color: white;
`

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
                email: student.email,
                classId: classObj.id,
            })) ?? [],
        [students, classObj.id]
    )

    const onUpdate = useCallback(
        async (studentId: string, updates: Partial<Student>) => {
            try {
                await updateStudent(classObj.id, studentId, {
                    id: updates.id,
                    name: updates.name,
                    email: updates.email,
                })
            } catch (error) {
                console.error(error)
            }

            Toast.success('Student updated')
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
        <DatagridStyles
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
                        Toast.error('Invalid email')
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
