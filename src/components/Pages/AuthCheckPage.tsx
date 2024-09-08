import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useRoute } from '../../hooks/useRoute'
import { useUser } from '../../hooks/useUser'
import { Loader } from '../common/Loader'

export const AuthCheckPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { signInRoute } = useRoute()
    const from =
        `${(location.state as any)?.from?.pathname ?? ''}${
            (location.state as any)?.from?.search ?? ''
        }` || '/'

    const { isAuthenticated, isLoading } = useUser()

    // Check user authentication on load
    useEffect(() => {
        if (isLoading) {
            return
        }

        // Else navigate to original route that is auth-protected
        else if (isAuthenticated) {
            navigate(from, { replace: true })
        }
    }, [isAuthenticated, from, isLoading, navigate])

    // If user is unable to be fetched, then navigate to signin page
    if (!isAuthenticated && !isLoading) {
        return <Navigate to={signInRoute} replace />
    }

    return (
        <Stack direction="row" alignItems="center" justifyContent="center">
            <Loader sx={{ m: 3 }} />
        </Stack>
    )
}
