import { Stack } from '@mui/material'

import { ActionBar } from './ActionBar/ActionBar'
import { Files } from './Files'

export const AllFiles = () => {
    return (
        <Stack spacing={2}>
            <ActionBar />
            <Files />
        </Stack>
    )
}
