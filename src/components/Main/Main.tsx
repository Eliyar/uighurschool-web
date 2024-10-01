import { Box, Container, Paper, Stack } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

import { getClasses } from '../../controllers/get-classes'
import { getFiles } from '../../controllers/get-files'
import { getLessons } from '../../controllers/get-lessons'
import { getStudents } from '../../controllers/get-students'
import { NavBar } from '../common/NavBar/NavBar'

export const Main = () => {
    useEffect(() => {
        const loadData = async () => {
            getLessons()
            getFiles()
            const classes = await getClasses()
            getStudents(classes)
        }
        loadData()
    }, [])

    return (
        <Container
            component="main"
            maxWidth="xl"
            sx={{ maxHeight: '100%', height: '100%', p: 1 }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Paper
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Stack direction="row">
                        <Stack direction="column" sx={{ flex: '1 1 100%' }}>
                            <NavBar />
                            <Box
                                sx={{
                                    flex: '1 1 100%',
                                    height: 'calc(100% - 78px - 16px)',
                                    overflowY: 'auto',
                                    position: 'relative',
                                }}
                            >
                                <Outlet />
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}
