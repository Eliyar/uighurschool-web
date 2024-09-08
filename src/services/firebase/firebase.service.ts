import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { setLogLevel as setFirestoreLogLevel } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { createFile } from './db/files/create'
import { deleteFile, deleteFiles } from './db/files/delete'
import { getFiles } from './db/files/read'
import { uploadFile } from './storage/upload-file'

setFirestoreLogLevel('debug')

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDb = getDatabase(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)

export const firebaseService = {
    db: {
        getFiles,
        createFile,
        deleteFile,
        deleteFiles,
    },
    storage: {
        uploadFile,
    },
}
