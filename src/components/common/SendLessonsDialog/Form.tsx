import { Stack, styled, SxProps, Theme, Typography } from '@mui/material'
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
            <Stack spacing={0.5}>
                <Label>Students</Label>
                <MultiSelectStudentsAutocomplete
                    placeholder="Select"
                    students={form.students}
                    onChange={(students, classId) => {
                        setStudents(students)

                        console.log('classId:', classId)
                    }}
                />
            </Stack>

            <Stack spacing={0.5}>
                <Label>Lessons</Label>
                <MultiSelectFilesAutocomplete
                    placeholder="Select"
                    files={form.files}
                    onChange={(files) => setFiles(files)}
                />
            </Stack>

            <Stack spacing={0.5}>
                <Label>Subject</Label>
                <TextField
                    value={(form.subject.value as string) ?? ''}
                    error={!!form.subject.error}
                    helperText={form.subject.error}
                    onChange={(value) => updateField('subject', value)}
                    onBlur={() => validateField('subject')}
                />
            </Stack>

            <Stack spacing={0.5}>
                <Label>Message</Label>
                <Editor
                    text={form.message.value as string}
                    onChange={(_, html) => updateField('message', html)}
                />
            </Stack>

            <DialogFooter
                actionNode={<Button label="Send" onClick={onSubmit} />}
                onClose={onClose}
            />
        </Stack>
    )
}

const Label = styled(Typography)`
    font-size: 14px;
    font-weight: 500;
`
