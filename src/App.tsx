import { useEffect } from 'react'

import { Main } from './components/Main/Main'
import { firebaseService } from './services/firebase/firebase.service'
import { FilesLoaded } from './services/store/actions'

export const App = () => {
    // TODO: Move to resolveData hook
    useEffect(() => {
        firebaseService.db.getFiles().then(FilesLoaded.dispatch)
    }, [])

    // return <SignIn />
    return <Main />
}
