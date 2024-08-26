import {
    PopperPlacementType,
    styled,
    Tooltip as TooltipLib,
    tooltipClasses,
    TooltipProps,
} from '@mui/material'
import { ReactElement, ReactNode } from 'react'

interface Props {
    content: ReactNode | string
    placement?: PopperPlacementType
    children: ReactElement<any, any>
}

const Styles = styled(({ className, ...props }: TooltipProps) => (
    <TooltipLib {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}))

export const Tooltip = ({ content, placement, children }: Props) => {
    return (
        <Styles
            title={content}
            PopperProps={{
                placement: placement ?? 'bottom-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 0],
                        },
                    },
                ],
            }}
            slotProps={{
                tooltip: {
                    sx: {
                        margin: 0,
                    },
                },
            }}
            arrow
        >
            {children}
        </Styles>
    )
}
