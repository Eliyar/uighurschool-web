import { get, ref } from 'firebase/database'

import { FileModel } from '../../models/File.model'
import { firebaseDb } from '../firebase.service'

export const getFiles = async (): Promise<FileModel[]> => {
    if (!firebaseDb) {
        throw new Error('Firebase database is not initialized')
    }

    const filesRef = ref(firebaseDb, 'files')
    const filesSnapshot = await get(filesRef)

    const files: FileModel[] = []
    filesSnapshot.forEach((fileSnapshot) => {
        const file = fileSnapshot.val()
        files.push(file)
    })

    return files
}
