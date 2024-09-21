import { Stack } from '@mui/material'

import { ActionBar } from './ActionBar/ActionBar'
import { Lessons } from './Lessons'

export const UpcomingLessons = () => {
    return (
        <Stack spacing={2}>
            <ActionBar />
            <Lessons />
        </Stack>
    )
}
