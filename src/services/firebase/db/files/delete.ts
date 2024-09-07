import { ref, update } from 'firebase/database'

import { FileModel } from '../../../models/File.model'
import { firebaseDb } from '../../firebase.service'

export const deleteFile = async (id: string): Promise<void> => {
    const updates: Partial<FileModel> = {
        deletedAt: new Date().toISOString(),
    }
    return update(ref(firebaseDb, `files/${id}`), updates)
}
