import { httpsCallable } from 'firebase/functions'

import { firebaseFunctions, firebaseService } from '../firebase.service'

export const authorize = async (): Promise<string> => {
    const user = await firebaseService.auth.getAsyncSignedInUser()
    const userId = user?.uid
    if (!userId) {
        throw new Error('User not authenticated')
    }

    try {
        const functionRef = httpsCallable(
            firebaseFunctions,
            'actions-authorize'
        )
        const response = await functionRef({
            userId,
        })
        return (response.data as any)?.url as string
    } catch (error) {
        console.error(error)
        throw error
    }
}
