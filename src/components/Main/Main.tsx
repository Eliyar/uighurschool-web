import { Container, Paper, Stack } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

import { getClasses } from '../../controllers/get-classes'
import { getFiles } from '../../controllers/get-files'
import { getStudents } from '../../controllers/get-students'
import { NavBar } from '../common/NavBar/NavBar'

export const Main = () => {
    useEffect(() => {
        const loadData = async () => {
            getFiles()
            const classes = await getClasses()
            getStudents(classes)
        }
        loadData()
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
                        <Stack sx={{ flex: '1 1 100%' }}>
                            <NavBar />
                            <Outlet />
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}
