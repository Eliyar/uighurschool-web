import { signInWithEmailAndPassword } from 'firebase/auth'

import { httpService } from '../../http/http.service'
import { firebaseAuth } from '../firebase.service'

export const signIn = async (
    email: string,
    password: string
): Promise<void> => {
    return signInWithEmailAndPassword(firebaseAuth, email, password).then(
        async () => {
            // Redirect to the google authorization page
            const url = await httpService.authorize()
            window.location.href = url

            // Once the user has been authorized, they will be redirected back to the app's main authenticated page
        }
    )
}
