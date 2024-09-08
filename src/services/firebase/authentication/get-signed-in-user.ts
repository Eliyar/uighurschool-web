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
