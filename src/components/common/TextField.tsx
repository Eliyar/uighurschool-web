import {
    styled,
    SxProps,
    TextField as TextFieldLib,
    TextFieldPropsSizeOverrides,
    Theme,
} from '@mui/material'
import classNames from 'classnames'
import { forwardRef, ReactNode, useRef } from 'react'

interface Props {
    className?: string
    id?: string
    type?: string
    label?: ReactNode | string
    placeholder?: string
    helperText?: ReactNode | string
    multiline?: boolean
    focusOnMount?: boolean
    startIcon?: ReactNode
    endIcon?: ReactNode
    value: string
    error?: boolean
    size?: OverridableStringUnion<
        'small' | 'medium',
        TextFieldPropsSizeOverrides
    >
    sx?: SxProps<Theme>
    readOnly?: boolean
    disabled?: boolean
    onChange(value: string): void
    onBlur?: (event: any) => void
    onFocus?: (event: any) => void
    onEnter?: () => void
}

const Styles = styled(TextFieldLib)``

export const TextField = forwardRef(
    (
        {
            className,
            id,
            type,
            label,
            placeholder,
            helperText,
            focusOnMount,
            multiline,
            startIcon,
            endIcon,
            value,
            error,
            size,
            sx,
            readOnly,
            disabled,
            onChange,
            onBlur,
            onFocus,
            onEnter,
        }: Props,
        ref: any
    ) => {
        const hasFocusRef = useRef<boolean>(false)

        return (
            <Styles
                className={classNames(className)}
                ref={ref}
                inputRef={(_ref) => {
                    if (focusOnMount && !hasFocusRef.current) {
                        setTimeout(() => {
                            _ref?.focus()
                            hasFocusRef.current = true
                        }, 100)
                    }
                }}
                id={id}
                type={type}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                size={size ?? 'medium'}
                InputProps={{
                    startAdornment: startIcon,
                    endAdornment: endIcon,
                    readOnly: readOnly,
                }}
                multiline={multiline}
                maxRows={3}
                value={value}
                error={error}
                onChange={(event) => onChange(event.target.value)}
                onBlur={(event) => onBlur?.(event)}
                onFocus={(event) => onFocus?.(event)}
                onKeyDown={(event) => {
                    if (event?.code === 'Enter') {
                        onEnter?.()
                    }
                }}
                sx={{ ...sx }}
                disabled={disabled}
            />
        )
    }
)
TextField.displayName = 'TextField'

export type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never

export type Overwrite<T, U> = DistributiveOmit<T, keyof U> & U

type GenerateStringUnion<T> = Extract<
    {
        [Key in keyof T]: true extends T[Key] ? Key : never
    }[keyof T],
    string
>

export type OverridableStringUnion<
    T extends string | number,
    U
> = GenerateStringUnion<Overwrite<Record<T, true>, U>>
