import { FileModel } from '../services/models/File.model'
import { Lesson } from '../services/models/Lesson.model'
import { deleteAllNavItems } from './delete-navitem'
import { openFile } from './open-file'
import { openWheel } from './open-wheel'

export const openLesson = (lesson: Lesson, files: FileModel[]) => {
    deleteAllNavItems()

    openWheel()

    files.forEach((file) => {
        openFile(file)
    })
}
