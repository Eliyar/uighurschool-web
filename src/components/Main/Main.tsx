import { Container, Paper, Stack } from '@mui/material'
import { Outlet } from 'react-router'

import { SideBar } from '../common/SideBar/SideBar'

export const Main = () => {
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
