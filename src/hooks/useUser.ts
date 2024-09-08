import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { firebaseService } from '../services/firebase/firebase.service'

export const useUser = () => {
    const [user, setUser] = useState<User | null>(
        firebaseService.auth.getSignedInUser()
    )
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        firebaseService.auth
            .getAsyncSignedInUser()
            .then(setUser)
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const isAuthenticated = !!user

    return {
        user,
        isAuthenticated,
        isLoading,
    }
}
