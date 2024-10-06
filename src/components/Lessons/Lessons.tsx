import { Divider, Stack, useMediaQuery, useTheme } from '@mui/material'

import { AllFiles } from './AllLessons/AllFiles'
import { LocalContextProvider } from './AllLessons/hooks/useLocalContext'
import { UpcomingLessons } from './UpcomingLessons/UpcomingLessons'

export const Lessons = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Stack sx={{ p: isMobile ? 2 : 3 }} spacing={6}>
            <UpcomingLessons />

            <Divider />

            <LocalContextProvider>
                <AllFiles />
            </LocalContextProvider>
        </Stack>
    )
}
