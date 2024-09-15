import { Stack, SxProps, Theme } from '@mui/material'
import { useCallback } from 'react'

import { Button } from '../Button'
import { DialogFooter } from '../DialogFooter'
import { NameField } from './Fields/NameField'
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
    const { form, updateField, submit } = useLocalContext().form

    const onSubmit = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            submit(() => {
                onClose?.(event, 'backdropClick')
            })
        },
        [submit, onClose]
    )

    return (
        <Stack sx={sx}>
            <NameField
                label="Class Name"
                name={(form.name.value as string) ?? ''}
                error={form.name.error}
                onChange={(value) => updateField('name', value)}
            />

            <DialogFooter
                actionNode={
                    <Button
                        label={isUpdating ? 'Update' : 'Create'}
                        onClick={onSubmit}
                    />
                }
                onClose={onClose}
            />
        </Stack>
    )
}
