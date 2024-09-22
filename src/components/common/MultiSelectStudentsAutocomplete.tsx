import {
    Autocomplete,
    Chip,
    ListItem,
    ListItemIcon,
    Stack,
    styled,
    SxProps,
    TextField,
    Theme,
    Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'

import { useClasses } from '../../hooks/useClasses'
import { useStudents } from '../../hooks/useStudents'
import { FieldError } from '../../lib/field'
import { Class } from '../../services/models/Class.model'
import { Student } from '../../services/models/Student.model'

interface Props {
    label?: string
    placeholder?: string
    students: Student[]
    sx?: SxProps<Theme>
    error?: FieldError
    onChange(students: Student[], classId?: string): void
    onBlur?(): void
}

export const MultiSelectStudentsAutocomplete = ({
    label,
    placeholder,
    students,
    sx,
    error,
    onChange,
    onBlur,
}: Props) => {
    const { options, optionsSelected } = useView(students)
    const [inputValue, setInputValue] = useState<string>('')

    return (
        <Autocomplete
            id="multiselect-students-autocomplete"
            noOptionsText="No students exist"
            options={options}
            value={optionsSelected}
            inputValue={inputValue}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, selected) => {
                const classId = selected?.find((s) => s.classId)?.classId

                const selectedStudents =
                    selected?.flatMap((s) => s.extendedProps as Student[]) ?? []

                const uniqueSelectedStudents =
                    selectedStudents.filter(
                        (student, index) =>
                            selectedStudents.findIndex(
                                (s) => s.id === student.id
                            ) === index
                    ) ?? []

                onChange(uniqueSelectedStudents, classId)
            }}
            onInputChange={(_, value) => setInputValue(value)}
            onBlur={() => onBlur?.()}
            renderInput={(params) => (
                <TextFieldStyles
                    {...params}
                    size="small"
                    label={label}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.isClass ? (
                        <Typography variant="body2" fontWeight={500}>
                            {option.label}
                        </Typography>
                    ) : (
                        <StudentItem
                            student={option.extendedProps?.[0] as Student}
                        />
                    )}
                </li>
            )}
            multiple={true}
            sx={{ ...sx }}
        />
    )
}

const TextFieldStyles = styled(TextField)`
    input {
        font-size: 14px;
        font-weight: 500;
    }
`

const useView = (selected: Student[]) => {
    const { classes } = useClasses()
    const { students, getByClassId } = useStudents()

    const options = useMemo((): AutocompleteOption[] => {
        const _options: AutocompleteOption[] = []

        _options.push(...makeOptionsFromClasses(classes, getByClassId))
        _options.push(...makeOptionsFromStudents(students))

        return _options
    }, [students, classes, getByClassId])

    const optionsSelected: AutocompleteOption[] = useMemo(
        () => makeOptionsFromStudents(selected),
        [selected]
    )

    const optionsFiltered = useMemo(() => {
        return options.filter(
            (option) => !optionsSelected.some((s) => s.id === option.id)
        )
    }, [options, optionsSelected])

    return { options: optionsFiltered, optionsSelected }
}

export interface AutocompleteOption {
    id: string
    value: string
    label: string
    classId?: string
    isClass?: boolean
    extendedProps?: Student[]
}

const StudentItem = ({ student }: { student: Student }) => {
    const { getClass } = useClasses()
    const { findClassId } = useStudents()

    const classId = useMemo(
        () => findClassId(student.id),
        [findClassId, student.id]
    )

    const classObj = useMemo(
        () => (classId ? getClass(classId) : undefined),
        [getClass, classId]
    )

    return (
        <ListItem sx={{ p: 0 }}>
            <Stack direction="row" alignItems="flex-start" gap={2}>
                {classObj && (
                    <ListItemIcon>
                        <Chip
                            label={classObj.name}
                            variant="outlined"
                            color="success"
                            size="small"
                            sx={{
                                fontWeight: 500,
                            }}
                        />
                    </ListItemIcon>
                )}
                <Stack>
                    <Typography variant="body2" fontWeight={500}>
                        {student.name}
                    </Typography>
                    <Typography color="secondary" variant="body2">
                        {student.email}
                    </Typography>
                </Stack>
            </Stack>
        </ListItem>
    )
}

const makeOptionsFromStudents = (students: Student[]): AutocompleteOption[] => {
    return (
        students?.map((student) => {
            return {
                id: student.id,
                value: student.id,
                label: `${student.name}, ${student.email}`,
                isClass: false,
                extendedProps: [student],
            }
        }) ?? []
    )
}

const makeOptionsFromClasses = (
    classes: Class[],
    getStudentsByClassId: (classId: string) => Student[]
): AutocompleteOption[] => {
    return (
        classes?.flatMap((classObj) => {
            const students = getStudentsByClassId(classObj.id)
            return {
                id: classObj.id,
                classId: classObj.id,
                value: classObj.id,
                label: classObj.name,
                isClass: true,
                extendedProps: students,
            }
        }) ?? []
    )
}
