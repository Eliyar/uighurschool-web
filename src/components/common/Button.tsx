import {
    PopperPlacementType,
    styled,
    SxProps,
    Theme,
    Typography,
} from '@mui/material'
import ButtonLib, {
    ButtonPropsColorOverrides,
    ButtonPropsSizeOverrides,
    ButtonPropsVariantOverrides,
} from '@mui/material/Button'
import classNames from 'classnames'
import { forwardRef, MouseEvent, ReactNode } from 'react'

import { Loader } from './Loader'
import { Tooltip } from './Tooltip'

interface Props {
    className?: string
    variant?: OverridableStringUnion<
        'text' | 'outlined' | 'contained',
        ButtonPropsVariantOverrides
    >
    color?:
        | OverridableStringUnion<
              | 'inherit'
              | 'primary'
              | 'secondary'
              | 'success'
              | 'error'
              | 'info'
              | 'warning',
              ButtonPropsColorOverrides
          >
        | undefined
    label: ReactNode | string
    startIcon?: ReactNode
    endIcon?: ReactNode
    align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined
    size?:
        | OverridableStringUnion<
              'small' | 'medium' | 'large',
              ButtonPropsSizeOverrides
          >
        | undefined
    sx?: SxProps<Theme>
    fullWidth?: boolean
    tooltipContent?: ReactNode
    tooltipPlacement?: PopperPlacementType
    disabled?: boolean
    isLoading?: boolean
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const Styles = styled(ButtonLib)``

export const Button = forwardRef(
    (
        {
            className,
            variant,
            color,
            label,
            startIcon,
            endIcon,
            align,
            size,
            sx,
            fullWidth,
            tooltipContent,
            tooltipPlacement,
            isLoading,
            disabled,
            onClick,
        }: Props,
        ref: any
    ) => {
        const buttonNode = (
            <Styles
                ref={ref}
                className={classNames(className)}
                variant={variant}
                color={color}
                startIcon={startIcon}
                endIcon={endIcon}
                sx={sx}
                size={size}
                fullWidth={fullWidth}
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                    onClick && onClick(event)
                }
                disabled={disabled || isLoading}
            >
                {isLoading ? (
                    <Loader size={18} />
                ) : (
                    <Typography variant="inherit" align={align}>
                        {label}
                    </Typography>
                )}
            </Styles>
        )

        return tooltipContent ? (
            <Tooltip content={tooltipContent} placement={tooltipPlacement}>
                {buttonNode}
            </Tooltip>
        ) : (
            buttonNode
        )
    }
)
Button.displayName = 'Button'

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
