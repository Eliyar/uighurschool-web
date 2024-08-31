import { FirebaseApp, initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyDJr8ZDBC1MdH7u_pWpK5VwARPgOPPLp0A',
    authDomain: 'uighurschool.firebaseapp.com',
    projectId: 'uighurschool',
    storageBucket: 'uighurschool.appspot.com',
    messagingSenderId: '776319110459',
    appId: '1:776319110459:web:4b97875ec93f312e0abb1e',
    measurementId: 'G-XD0G9QFKM3',
}

export const firebaseService = (() => {
    let app: FirebaseApp | undefined

    const init = () => {
        app = initializeApp(firebaseConfig)
    }

    return {
        init,
        app,
    }
})()
