import { FileModel } from '../models/File.model'

export interface State {
    files: FileModel[]
}

export const initialState: State = {
    files: [],
}
