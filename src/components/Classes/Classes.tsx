import { Stack } from '@mui/material'
import React from 'react'

import { ActionBar } from './ActionBar'
import { ClassesList } from './ClassesList'

export const Classes: React.FC = () => {
    return (
        <Stack sx={{ p: 3 }} spacing={3}>
            <ActionBar />
            <ClassesList />
        </Stack>
    )
}
