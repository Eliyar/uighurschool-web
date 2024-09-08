import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

const BASE_HREF = ''

enum ROUTE {
    MAIN = '/',
    AUTHCHECK = '/auth',
    SIGNIN = '/auth/signin',
    LESSONS = '/visits',
    UNAUTHORIZED = '/unauthorized',
}

const authCheckRoute = `${BASE_HREF}${ROUTE.AUTHCHECK}`
const signInRoute = `${BASE_HREF}${ROUTE.SIGNIN}`
const mainRoute = `${BASE_HREF}${ROUTE.MAIN}`
const lessonsRoute = `${BASE_HREF}${ROUTE.LESSONS}`
const unauthorizedRoute = `${BASE_HREF}${ROUTE.UNAUTHORIZED}`

const publicRoutes = [ROUTE.SIGNIN]

export const useRoute = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const isProtectedRoute = useMemo(
        () =>
            publicRoutes.find((route) => pathname.startsWith(route))
                ? false
                : true,
        [pathname]
    )

    const navAuthCheck = useCallback(() => navigate(authCheckRoute), [navigate])
    const navSignIn = useCallback(
        (state: any) => navigate(signInRoute, { state }),
        [navigate]
    )
    const navMain = useCallback(() => navigate(mainRoute), [navigate])
    const navVisits = useCallback(() => navigate(lessonsRoute), [navigate])
    const navUnauthorized = useCallback(
        () => navigate(unauthorizedRoute),
        [navigate]
    )

    return {
        authCheckRoute,
        signInRoute,
        mainRoute,
        lessonsRoute,
        unauthorizedRoute,
        isProtectedRoute,
        navAuthCheck,
        navSignIn,
        navMain,
        navVisits,
        navUnauthorized,
    }
}
