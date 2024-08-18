import { Paper, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Logo } from '../common/Logo'

export default function SignIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100%' }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '100%' }}
            >
                <Paper sx={{ p: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Logo sx={{ mb: 1 }} />
                        <Typography
                            component="h1"
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                        >
                            Uighur School
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                size="large"
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Stack>
        </Container>
    )
}
