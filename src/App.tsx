import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom'

import { AuthCheckPage } from './components/Pages/AuthCheckPage'
import { ClassesPage } from './components/Pages/ClassesPage'
import { LessonsPage } from './components/Pages/LessonsPage'
import { MainPage } from './components/Pages/MainPage'
import { SendPage } from './components/Pages/SendPage'
import { SignInPage } from './components/Pages/SignInPage'
import { ViewFilePage } from './components/Pages/ViewFilePage'
import { useRoute } from './hooks/useRoute'
import { useUser } from './hooks/useUser'

export const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    )
}

const AppRoutes = () => {
    const {
        signInRoute,
        lessonsRoute,
        sendRoute,
        authCheckRoute,
        mainRoute,
        classesRoute,
        filesRoute,
    } = useRoute()
    return (
        <Routes>
            <Route path={signInRoute} element={<SignInPage />} />
            <Route path={authCheckRoute} element={<AuthCheckPage />} />
            <Route
                path={mainRoute}
                element={
                    <RequiresAuth authCheckRoute={authCheckRoute}>
                        <MainPage />
                    </RequiresAuth>
                }
            >
                <Route path={lessonsRoute} element={<LessonsPage />} />
                <Route path={sendRoute} element={<SendPage />} />
                <Route path={classesRoute} element={<ClassesPage />} />
                <Route path={filesRoute} element={<ViewFilePage />} />
                <Route
                    path={`${mainRoute}`}
                    element={<Navigate to={lessonsRoute} replace />}
                />
                <Route
                    path={`${mainRoute}/*`}
                    element={<Navigate to={lessonsRoute} replace />}
                />
            </Route>
            <Route
                path={`${authCheckRoute}/*`}
                element={<Navigate to={signInRoute} replace />}
            />
        </Routes>
    )
}

const RequiresAuth = ({
    authCheckRoute,
    children,
}: {
    authCheckRoute: string
    children: JSX.Element
}) => {
    const { user } = useUser()
    const location = useLocation()

    if (!user) {
        return (
            <Navigate to={authCheckRoute} state={{ from: location }} replace />
        )
    }

    return children
}
