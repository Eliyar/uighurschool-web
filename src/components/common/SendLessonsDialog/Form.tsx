import { Stack, SxProps, Theme } from '@mui/material'
import { useCallback } from 'react'

import { Button } from '../Button'
import { DialogFooter } from '../DialogFooter'
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
    const { form, updateField, submit, validateField } = useLocalContext().form

    const onSubmit = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            submit(() => {
                onClose?.(event, 'backdropClick')
            })
        },
        [submit, onClose]
    )

    return (
        <Stack sx={sx} spacing={2}>
            <TextField
                label="Email"
                value={(form.email.value as string) ?? ''}
                error={!!form.email.error}
                helperText={form.email.error}
                onChange={(value) => updateField('email', value)}
                onBlur={() => validateField('email')}
            />
            <TextField
                label="Subject"
                value={(form.subject.value as string) ?? ''}
                error={!!form.subject.error}
                helperText={form.subject.error}
                onChange={(value) => updateField('subject', value)}
                onBlur={() => validateField('subject')}
            />
            <TextField
                label="Message"
                value={(form.message.value as string) ?? ''}
                error={!!form.message.error}
                helperText={form.message.error}
                onChange={(value) => updateField('message', value)}
                onBlur={() => validateField('message')}
                multiline
            />

            <DialogFooter
                actionNode={<Button label="Send" onClick={onSubmit} />}
                onClose={onClose}
            />
        </Stack>
    )
}
