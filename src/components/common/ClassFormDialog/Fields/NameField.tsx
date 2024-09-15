import { styled } from '@mui/material'
import { ReactNode } from 'react'

import { FieldError } from '../../../../lib/field'
import { TextField } from '../../TextField'

interface Props {
    label?: ReactNode | string
    name: string
    error: FieldError
    onChange(name: string): void
    onBlur?: (event: any) => void
}

const Styles = styled(TextField)`
    .MuiOutlinedInput-notchedOutline {
        border-color: transparent !important;
    }
`

export const NameField = ({ label, name, error, onChange, onBlur }: Props) => {
    return (
        <Styles
            label={label}
            value={name}
            error={!!error}
            helperText={error}
            onChange={onChange}
            onBlur={onBlur}
            sx={{ flex: '1 1 100%' }}
        />
    )
}
