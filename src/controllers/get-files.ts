import { firebaseService } from '../services/firebase/firebase.service'
import { FileModel } from '../services/models/File.model'
import { FilesLoaded } from '../services/store/actions'

export const getFiles = async (): Promise<FileModel[]> => {
    return firebaseService.db.getFiles().then((files) => {
        FilesLoaded.dispatch(files)
        return files
    })
}
