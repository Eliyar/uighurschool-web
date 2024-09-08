import { CircularProgress, SxProps, Theme } from '@mui/material'
import classNames from 'classnames'

interface Props {
    className?: string
    size?: string | number
    sx?: SxProps<Theme>
}

export const Loader = ({ className, size, sx }: Props) => (
    <CircularProgress
        className={classNames(className)}
        size={size ?? 24}
        color="secondary"
        thickness={5}
        sx={sx}
    />
)
