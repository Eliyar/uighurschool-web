import { List, ListItem, ListItemText } from '@mui/material'
import { useMemo } from 'react'

import { useStudents } from '../../hooks/useStudents'

interface Props {
    classId: string
}

export const StudentsList = ({ classId }: Props) => {
    const { getByClassId } = useStudents()

    const students = useMemo(
        () => getByClassId(classId),
        [classId, getByClassId]
    )

    return (
        <List dense>
            {students?.map((student) => (
                <ListItem key={student.id}>
                    <ListItemText primary={student.name} />
                </ListItem>
            ))}
        </List>
    )
}
