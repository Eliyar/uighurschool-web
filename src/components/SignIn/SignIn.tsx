import { Alert, Paper, Stack } from '@mui/material'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FirebaseError } from 'firebase/app'
import { useCallback, useState } from 'react'

import { useRoute } from '../../hooks/useRoute'
import { firebaseService } from '../../services/firebase/firebase.service'
import { Button } from '../common/Button'
import { Logo } from '../common/Logo'

export default function SignIn() {
    const { navMain } = useRoute()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const email = data.get('email') as string
            const password = data.get('password') as string

            if (!email || !password) {
                return
            }

            try {
                setIsLoading(true)
                await firebaseService.auth.signIn(email, password)
                navMain()
                setError(null)
            } catch (error) {
                const code = (error as FirebaseError).code
                let message = 'Invalid Email or Password'
                if (
                    code !== 'auth/invalid-credential' &&
                    code !== 'auth/invalid-email'
                ) {
                    message = 'Unable to sign in'
                }
                setError(message)
            }

            setIsLoading(false)
        },
        [navMain]
    )

    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100%' }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '100%', width: '100%' }}
            >
                <Paper sx={{ p: 3, width: '100%' }}>
                    <Stack
                        component="form"
                        onSubmit={handleSubmit}
                        onChange={() => {
                            setError(null)
                        }}
                        noValidate
                        direction="column"
                        alignItems="center"
                        spacing={4}
                    >
                        <Stack direction="column" alignItems="center">
                            <Logo sx={{ mb: 1 }} />
                            <Typography
                                component="h1"
                                variant="h5"
                                color="primary"
                                fontWeight="bold"
                            >
                                Uighur School
                            </Typography>
                        </Stack>

                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                error={!!error}
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
                                error={!!error}
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                label="Sign In"
                                isLoading={isLoading}
                                disabled={isLoading}
                            />

                            {error && <Alert severity="error">{error}</Alert>}
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}
