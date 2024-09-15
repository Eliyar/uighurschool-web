import { Container, Paper, Stack } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

import { getClasses } from '../../controllers/get-classes'
import { getFiles } from '../../controllers/get-files'
import { SideBar } from '../common/SideBar/SideBar'

export const Main = () => {
    useEffect(() => {
        getFiles()
        getClasses()
    }, [])

    return (
        <Container component="main" maxWidth="xl" sx={{ height: '100%' }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ width: '100%', height: '100%' }}
            >
                <Paper sx={{ width: '100%' }}>
                    <Stack direction="row">
                        <SideBar />
                        <Stack sx={{ flex: '1 1 100%' }}>
                            <Outlet />
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}
