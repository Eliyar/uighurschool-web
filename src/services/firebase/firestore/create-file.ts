import { ref, set } from 'firebase/database'

import { FileModel } from '../../models/File.model'
import { firebaseDb } from '../firebase.service'

export const createFile = async (file: FileModel): Promise<void> => {
    return set(ref(firebaseDb, `files/${file.id}`), file)
}
