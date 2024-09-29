import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { setLogLevel as setFirestoreLogLevel } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

import {
    getAsyncSignedInUser,
    getFirebaseToken,
    getSignedInUser,
} from './authentication/get-signed-in-user'
import { signIn } from './authentication/sign-in'
import { createClass } from './db/classes/create'
import { getClasses } from './db/classes/read'
import { updateClass } from './db/classes/update'
import { createClassStudent } from './db/classStudents/create'
import { deleteClassStudent } from './db/classStudents/delete'
import { getClassStudents } from './db/classStudents/read'
import { createFile } from './db/files/create'
import { deleteFile, deleteFiles } from './db/files/delete'
import { getFiles } from './db/files/read'
import { getLessons } from './db/lessons/read'
import { createStudent } from './db/students/create'
import { deleteStudent } from './db/students/delete'
import { getStudents } from './db/students/read'
import { updateStudent } from './db/students/update'
import { authorize } from './functions/authorize'
import { authorizeCallback } from './functions/authorize-callback'
import { sendEmail } from './functions/send-email'
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
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getDatabase(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)
export const firebaseFunctions = getFunctions(firebaseApp)

// For debugging: connect to functions locally
if (
    window.location.hostname === 'localhost' ||
    window.location.hostname?.includes('192.168')
) {
    connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001)
}

export const firebaseService = {
    auth: {
        getSignedInUser,
        getAsyncSignedInUser,
        getFirebaseToken,
        signIn,
    },
    db: {
        createFile,
        createClass,
        createClassStudent,
        createStudent,
        getLessons,
        getFiles,
        getClasses,
        getClassStudents,
        getStudents,
        updateClass,
        updateStudent,
        deleteFile,
        deleteFiles,
        deleteStudent,
        deleteClassStudent,
    },
    storage: {
        uploadFile,
    },
    functions: {
        authorize,
        authorizeCallback,
        sendEmail,
    },
}
