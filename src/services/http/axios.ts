import axios from 'axios'

import { firebaseService } from '../firebase/firebase.service'

export const ax = axios.create({
    baseURL: process.env.REACT_APP_API,
})

// The access token is managed by the server with userid
// Attach userid to every request
ax.interceptors.request.use(async (config) => {
    const user = await firebaseService.auth.getAsyncSignedInUser()
    const userId = user?.uid
    if (userId) {
        config.headers['x-uighurschool-userid'] = userId
    }
    return config
})

// The access token is refreshed automatically by the server when it expires
// If server has failed to refresh the token, it will return 401 status which we should redirect to login page
ax.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error?.response?.status === 401 && !originalRequest._retry) {
            window.location.href = '/auth/signin'
        }

        return Promise.reject(error)
    }
)
