import { get, orderByChild, query, ref } from 'firebase/database'

import { FileModel } from '../../../models/File.model'
import { firebaseDb } from '../../firebase.service'

export const getFiles = async (): Promise<FileModel[]> => {
    if (!firebaseDb) {
        throw new Error('Firebase database is not initialized')
    }

    // Get files ordered by createdAt
    const filesRef = ref(firebaseDb, 'files')
    const filesQuery = query(filesRef, orderByChild('createdAt'))
    const filesSnapshot = await get(filesQuery)

    const files: FileModel[] = []
    filesSnapshot.forEach((fileSnapshot) => {
        const file = fileSnapshot.val()
        files.push(file)
    })

    // Reverse the order to show the latest files first
    return files.reverse()
}
