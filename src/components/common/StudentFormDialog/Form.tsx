import { Stack, SxProps, Theme } from '@mui/material'
import { useCallback } from 'react'

import { Button } from '../Button'
import { DialogFooter } from '../DialogFooter'
import { TextField } from '../TextField'
import { useLocalContext } from './hooks/useLocalContext'

interface Props {
    isUpdating: boolean
    sx?: SxProps<Theme>
    onClose?: (
        event: React.MouseEvent<HTMLButtonElement>,
        reason: 'backdropClick' | 'escapeKeyDown'
    ) => void
}

export const Form = ({ isUpdating, sx, onClose }: Props) => {
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
                label="Name"
                value={(form.name.value as string) ?? ''}
                error={!!form.name.error}
                helperText={form.name.error}
                onChange={(value) => updateField('name', value)}
                onBlur={() => validateField('name')}
            />
            <TextField
                label="Email"
                value={(form.email.value as string) ?? ''}
                error={!!form.email.error}
                helperText={form.email.error}
                onChange={(value) => updateField('email', value)}
                onBlur={() => validateField('email')}
            />

            <DialogFooter
                actionNode={
                    <Button
                        label={isUpdating ? 'Update' : 'Add'}
                        onClick={onSubmit}
                    />
                }
                onClose={onClose}
            />
        </Stack>
    )
}
