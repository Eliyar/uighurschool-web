import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

const BASE_HREF = ''

enum ROUTE {
    MAIN = '/',
    AUTHCHECK = '/auth',
    SIGNIN = '/auth/signin',
    GOOGLE_AUTH_CALLBACK = '/auth/google/callback',
    LESSONS = '/lessons',
    SEND = '/send',
    URL = '/url',
    UNAUTHORIZED = '/unauthorized',
    CLASSES = '/classes',
}

const authCheckRoute = `${BASE_HREF}${ROUTE.AUTHCHECK}`
const signInRoute = `${BASE_HREF}${ROUTE.SIGNIN}`
const mainRoute = `${BASE_HREF}${ROUTE.MAIN}`
const lessonsRoute = `${BASE_HREF}${ROUTE.LESSONS}`
const sendRoute = `${BASE_HREF}${ROUTE.SEND}`
const urlRoute = `${BASE_HREF}${ROUTE.URL}/:id`
const unauthorizedRoute = `${BASE_HREF}${ROUTE.UNAUTHORIZED}`
const classesRoute = `${BASE_HREF}${ROUTE.CLASSES}`
const googleAuthCallbackRoute = `${BASE_HREF}${ROUTE.GOOGLE_AUTH_CALLBACK}`
const publicRoutes = [ROUTE.SIGNIN, ROUTE.GOOGLE_AUTH_CALLBACK]

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
    const navLessons = useCallback(() => navigate(lessonsRoute), [navigate])
    const navSend = useCallback(() => navigate(sendRoute), [navigate])
    const navViewUrl = useCallback(
        (id: string) => navigate(urlRoute.replace(':id', id)),
        [navigate]
    )
    const navClasses = useCallback(() => navigate(classesRoute), [navigate])
    const navUnauthorized = useCallback(
        () => navigate(unauthorizedRoute),
        [navigate]
    )

    return {
        authCheckRoute,
        signInRoute,
        mainRoute,
        lessonsRoute,
        sendRoute,
        classesRoute,
        urlRoute,
        unauthorizedRoute,
        isProtectedRoute,
        googleAuthCallbackRoute,
        navAuthCheck,
        navSignIn,
        navMain,
        navLessons,
        navSend,
        navClasses,
        navViewUrl,
        navUnauthorized,
    }
}
