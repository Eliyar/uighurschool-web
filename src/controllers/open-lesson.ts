import { FileModel } from '../services/models/File.model'
import { deleteAllNavItems } from './delete-navitem'
import { openFile } from './open-file'
import { openWheel } from './open-wheel'

export const openLesson = (files: FileModel[], wheelsUrl?: string) => {
    deleteAllNavItems()

    if (wheelsUrl) {
        openWheel(wheelsUrl)
    }

    files.forEach((file) => {
        openFile(file)
    })
}
