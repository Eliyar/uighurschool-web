import { Stack, Typography } from '@mui/material'

import { SendLessonsDialogTrigger } from '../../../common/SendLessonsDialog/SendLessonsDialogTrigger'

export const ActionBar = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">Lessons</Typography>
            </Stack>

            <SendLessonsDialogTrigger />
        </Stack>
    )
}
