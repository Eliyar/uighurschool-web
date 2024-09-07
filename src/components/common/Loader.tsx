import { CircularProgress } from '@mui/material'
import classNames from 'classnames'

interface Props {
    className?: string
    size?: string | number
}

export const Loader = ({ className, size }: Props) => (
    <CircularProgress
        className={classNames(className)}
        size={size ?? 24}
        color="secondary"
        thickness={5}
    />
)
