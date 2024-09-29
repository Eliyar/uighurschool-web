import { httpsCallable } from 'firebase/functions'

import { firebaseFunctions } from '../firebase.service'

export const authorizeCallback = async (code: string, state: string) => {
    try {
        const functionRef = httpsCallable(
            firebaseFunctions,
            'actions-authorizeCallback'
        )
        return functionRef({
            code,
            state,
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}
