import { FileModel } from '../services/models/File.model'
import { deleteAllNavItems } from './delete-navitem'
import { openFile } from './open-file'

export const openLesson = (files: FileModel[]) => {
    deleteAllNavItems()

    files.forEach((file) => {
        openFile(file)
    })
}
