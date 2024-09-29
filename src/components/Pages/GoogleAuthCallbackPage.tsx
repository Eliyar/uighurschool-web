import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { firebaseService } from '../../services/firebase/firebase.service'

export const GoogleAuthCallbackPage = () => {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    useEffect(() => {
        // Send back the code and state received from Google to the server to get the user's token
        if (code && state) {
            firebaseService.functions
                .authorizeCallback(code, state)
                .then(() => {
                    // Redirect to the app's main authenticated page
                    window.location.href = '/'
                })
        }
    }, [code, state])

    return null
}
