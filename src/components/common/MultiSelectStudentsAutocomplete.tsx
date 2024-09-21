import { Autocomplete, styled, SxProps, TextField, Theme } from '@mui/material'
import { useMemo, useState } from 'react'

import { useClasses } from '../../hooks/useClasses'
import { useStudents } from '../../hooks/useStudents'
import { Class } from '../../services/models/Class.model'
import { Student } from '../../services/models/Student.model'

interface Props {
    label?: string
    placeholder?: string
    students: Student[]
    sx?: SxProps<Theme>
    onChange(students: Student[]): void
}

export const MultiSelectStudentsAutocomplete = ({
    label,
    placeholder,
    students,
    sx,
    onChange,
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
                const selectedStudents =
                    selected?.flatMap((s) => s.extendedProps as Student[]) ?? []

                const uniqueSelectedStudents =
                    selectedStudents.filter(
                        (student, index) =>
                            selectedStudents.findIndex(
                                (s) => s.id === student.id
                            ) === index
                    ) ?? []

                onChange(uniqueSelectedStudents)
            }}
            onInputChange={(_, value) => setInputValue(value)}
            renderInput={(params) => (
                <TextFieldStyles
                    {...params}
                    size="small"
                    label={label}
                    placeholder={placeholder}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.label}
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
    extendedProps?: Student[]
}

const makeOptionsFromStudents = (students: Student[]): AutocompleteOption[] => {
    return (
        students?.map((student) => ({
            id: student.id,
            value: student.id,
            label: `${student.name} [${student.email}]`,
            extendedProps: [student],
        })) ?? []
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
                value: classObj.id,
                label: classObj.name,
                extendedProps: students,
            }
        }) ?? []
    )
}
