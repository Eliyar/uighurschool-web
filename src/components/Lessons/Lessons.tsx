import { Stack } from '@mui/material'

import { ActionBar } from './ActionBar/ActionBar'
import { Files } from './Files'
import { LocalContextProvider } from './hooks/useLocalContext'

export const Lessons = () => {
    return (
        <LocalContextProvider>
            <Stack sx={{ p: 3 }} spacing={3}>
                <ActionBar />
                <Files />
            </Stack>
        </LocalContextProvider>
    )
}
