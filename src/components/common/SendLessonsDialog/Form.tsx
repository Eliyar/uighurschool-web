import { Stack, SxProps, Theme } from '@mui/material'
import { useCallback } from 'react'

import { Button } from '../Button'
import { DialogFooter } from '../DialogFooter'
import { Editor } from '../Editor'
import { MultiSelectFilesAutocomplete } from '../MultiSelectFilesAutocomplete'
import { MultiSelectStudentsAutocomplete } from '../MultiSelectStudentsAutocomplete'
import { TextField } from '../TextField'
import { useLocalContext } from './hooks/useLocalContext'

interface Props {
    sx?: SxProps<Theme>
    onClose?: (
        event: React.MouseEvent<HTMLButtonElement>,
        reason: 'backdropClick' | 'escapeKeyDown'
    ) => void
}

export const Form = ({ sx, onClose }: Props) => {
    const { form, updateField, setStudents, setFiles, submit, validateField } =
        useLocalContext().form

    const onSubmit = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            submit(() => {
                onClose?.(event, 'backdropClick')
            })
        },
        [submit, onClose]
    )

    return (
        <Stack sx={sx} spacing={4}>
            <MultiSelectStudentsAutocomplete
                label="Students"
                placeholder="Select"
                students={form.students}
                onChange={(students, classId) => {
                    setStudents(students)

                    console.log('classId:', classId)
                }}
            />

            <MultiSelectFilesAutocomplete
                label="Lessons"
                placeholder="Select"
                files={form.files}
                onChange={(files) => setFiles(files)}
            />

            <TextField
                label="Subject"
                value={(form.subject.value as string) ?? ''}
                error={!!form.subject.error}
                helperText={form.subject.error}
                onChange={(value) => updateField('subject', value)}
                onBlur={() => validateField('subject')}
            />

            <Editor
                text={form.message.value as string}
                onChange={(_, html) => updateField('message', html)}
            />

            <DialogFooter
                actionNode={<Button label="Send" onClick={onSubmit} />}
                onClose={onClose}
            />
        </Stack>
    )
}
