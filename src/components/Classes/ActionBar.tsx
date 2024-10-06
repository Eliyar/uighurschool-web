import { Typography } from '@mui/material'

import { ClassformDialogTrigger } from '../common/ClassFormDialog/ClassformDialogTrigger'
import { ActionBarStyles } from '../common/styles/styles'

export const ActionBar = () => {
    return (
        <ActionBarStyles>
            <Typography variant="h6">Classes</Typography>
            <ClassformDialogTrigger />
        </ActionBarStyles>
    )
}
