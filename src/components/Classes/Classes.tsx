import { Stack, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

import { ActionBar } from './ActionBar'
import { ClassesList } from './ClassesList'

export const Classes: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Stack sx={{ p: isMobile ? 2 : 3 }} spacing={3}>
            <ActionBar />
            <ClassesList />
        </Stack>
    )
}
