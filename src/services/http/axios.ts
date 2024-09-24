import axios from 'axios'

import { firebaseService } from '../firebase/firebase.service'

export const ax = axios.create({
    baseURL: process.env.REACT_APP_API,
})

ax.interceptors.request.use(async (config) => {
    const token = await firebaseService.auth.getFirebaseToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})
