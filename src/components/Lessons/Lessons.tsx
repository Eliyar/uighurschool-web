import { Divider, Stack } from '@mui/material'

import { AllFiles } from './AllLessons/AllFiles'
import { LocalContextProvider } from './AllLessons/hooks/useLocalContext'
import { UpcomingLessons } from './UpcomingLessons/UpcomingLessons'

export const Lessons = () => {
    return (
        <Stack sx={{ p: 3 }} spacing={6}>
            <UpcomingLessons />

            <Divider />

            <LocalContextProvider>
                <AllFiles />
            </LocalContextProvider>
        </Stack>
    )
}
