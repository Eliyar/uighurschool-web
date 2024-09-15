import { Class } from '../models/Class.model'
import { FileModel } from '../models/File.model'

export interface State {
    files: FileModel[]
    classes: Class[]
}

export const initialState: State = {
    files: [],
    classes: [],
}
