import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { FileModel } from '../services/models/File.model'
import { State } from '../services/store/state'

export const useFiles = () => {
    const files = useSelector((state: State) => state.files)

    const filesActive = useMemo(
        () => files.filter((file) => !file.deletedAt),
        [files]
    )

    const getById = useCallback(
        (id: string) => {
            return files.find((file) => file.id === id)
        },
        [files]
    )

    const getBySimilarName = useCallback(
        (name: string) => {
            return FileModel.getBySimilarName(filesActive, name)
        },
        [filesActive]
    )

    return {
        files,
        filesActive,
        getById,
        getBySimilarName,
    }
}
