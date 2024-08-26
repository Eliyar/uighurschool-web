import { Stack } from '@mui/material'

import { FileUploader } from '../FileUploader/FileUploader'

export const Lessons = () => {
    return (
        <Stack sx={{ width: '100%' }}>
            <FileUploader />
        </Stack>
    )
}
