import { Stack } from '@mui/material'

import { FileUploader } from '../FileUploader/FileUploader'
import { ActionBar } from './ActionBar/ActionBar'
import { Files } from './Files'
import { LocalContextProvider } from './hooks/useLocalContext'

export const Lessons = () => {
    return (
        <LocalContextProvider>
            <Stack sx={{ p: 3 }} spacing={3}>
                <ActionBar />
                <Files />
                <FileUploader />
            </Stack>
        </LocalContextProvider>
    )
}
