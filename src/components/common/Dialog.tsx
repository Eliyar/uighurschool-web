import { DialogTitle, Paper, PaperProps, styled } from '@mui/material'
import Draggable from 'react-draggable'

import Colors from '../../colors'

type Props = {
    dragHandleId: string
} & PaperProps

export const DialogPaperComponent = ({ dragHandleId, ...props }: Props) => {
    return (
        <Draggable
            handle={dragHandleId}
            cancel={'[class*="MuiDialogContent-root"]'}
            bounds="body"
        >
            <Paper {...props} elevation={1} />
        </Draggable>
    )
}

export const DraggableDialogTitleStyles = styled(DialogTitle)`
    &:hover {
        cursor: move;
        background-color: ${Colors.CONTROLLER_BACKGROUND};
    }
`
