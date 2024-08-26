import { Checkbox as CheckboxLib, FormControlLabel } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
    value: boolean
    label?: ReactNode | string
    onChange(value: boolean): void
}

export const Checkbox = ({ value, label, onChange }: Props) => {
    return (
        <FormControlLabel
            control={
                <CheckboxLib
                    checked={value}
                    onChange={(event) => {
                        const checked = event.target.checked
                        onChange(checked)
                    }}
                />
            }
            label={label}
        />
    )
}
