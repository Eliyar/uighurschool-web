import { useSelector } from 'react-redux'

import { FileModel } from '../services/models/File.model'
import { State } from '../services/store/state'

export const useFiles = () => {
    const files = useSelector((state: State) => state.files)

    const filesActive = files.filter((file) => !file.deletedAt)

    const getBySimilarName = (name: string) => {
        return FileModel.getBySimilarName(filesActive, name)
    }

    return {
        files,
        filesActive,
        getBySimilarName,
    }
}
