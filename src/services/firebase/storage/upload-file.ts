import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { firebaseStorage } from '../firebase.service'

export const uploadFile = async (file: File): Promise<string> => {
    if (!firebaseStorage) {
        throw new Error('Firebase storage is not initialized')
    }

    const storageRef = ref(firebaseStorage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
                console.error(`Error uploading file ${file.name}`, error)
                reject(error)
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    )
                    resolve(downloadUrl)
                } catch (error) {
                    console.error('Error getting download URL:', error)
                    reject(error)
                }
            }
        )
    })
}
