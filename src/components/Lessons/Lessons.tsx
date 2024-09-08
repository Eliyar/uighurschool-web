import { Stack } from '@mui/material'
import { useEffect } from 'react'

import { firebaseService } from '../../services/firebase/firebase.service'
import { FilesLoaded } from '../../services/store/actions'
import { ActionBar } from './ActionBar/ActionBar'
import { Files } from './Files'
import { LocalContextProvider } from './hooks/useLocalContext'

export const Lessons = () => {
    useEffect(() => {
        firebaseService.db.getFiles().then(FilesLoaded.dispatch)
    }, [])

    return (
        <LocalContextProvider>
            <Stack sx={{ p: 3 }} spacing={3}>
                <ActionBar />
                <Files />
            </Stack>
        </LocalContextProvider>
    )
}
