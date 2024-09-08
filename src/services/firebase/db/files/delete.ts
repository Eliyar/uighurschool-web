import { ref, update } from 'firebase/database'

import { FileModel } from '../../../models/File.model'
import { firebaseDb } from '../../firebase.service'

export const deleteFile = async (id: string): Promise<void> => {
    const updates: Partial<FileModel> = {
        deletedAt: new Date().toISOString(),
    }
    return update(ref(firebaseDb, `files/${id}`), updates)
}

export const deleteFiles = async (files: FileModel[]): Promise<void> => {
    const updates: Record<string, Partial<FileModel>> = {}
    files.forEach((file) => {
        updates[file.id] = {
            ...file,
            deletedAt: new Date().toISOString(),
        }
    })
    return update(ref(firebaseDb, 'files'), updates)
}
