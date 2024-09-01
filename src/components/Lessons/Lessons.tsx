import { Stack } from '@mui/material'

import { FileUploader } from '../FileUploader/FileUploader'
import { Files } from './Files'

export const Lessons = () => {
    return (
        <Stack sx={{ p: 3 }} spacing={3}>
            <Files />
            <FileUploader />
        </Stack>
    )
}
