import { onAuthStateChanged, User } from 'firebase/auth'

import { firebaseAuth } from '../firebase.service'

export const getSignedInUser = (): User | null => {
    return firebaseAuth.currentUser
}

export const getAsyncSignedInUser = (): Promise<User | null> => {
    return new Promise<User | null>((resolve) => {
        onAuthStateChanged(firebaseAuth, (user) => {
            resolve(user)
        })
    })
}

export const getFirebaseToken = async (): Promise<string | null> => {
    const user = await getAsyncSignedInUser()

    if (user) {
        try {
            const token = await user.getIdToken()
            return token
        } catch (error) {
            console.error('Error getting Firebase token:', error)
            return null
        }
    }

    return null
}
