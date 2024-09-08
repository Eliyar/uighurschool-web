import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'

import { firebaseAuth } from '../firebase.service'

export const signIn = (
    email: string,
    password: string
): Promise<UserCredential> => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
}
