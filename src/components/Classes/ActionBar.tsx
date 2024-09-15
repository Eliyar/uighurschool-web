import { Stack, Typography } from '@mui/material'

import { ClassformDialogTrigger } from '../common/ClassFormDialog/ClassformDialogTrigger'

export const ActionBar = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography variant="h6">Classes</Typography>

            <ClassformDialogTrigger />
        </Stack>
    )
}
