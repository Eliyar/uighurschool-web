import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { FileModel } from '../services/models/File.model'
import { State } from '../services/store/state'

export const useFiles = () => {
    const files = useSelector((state: State) => state.files)

    const filesSorted = useMemo(() => FileModel.sort(files), [files])

    const filesActive = useMemo(
        () => files.filter((file) => !file.deletedAt),
        [files]
    )

    const filesAndSubFiles = useMemo(
        () => files.flatMap((file) => [file, ...(file.subFiles || [])]),
        [files]
    )

    const getById = useCallback(
        (id: string) => {
            return filesAndSubFiles.find((file) => file.id === id)
        },
        [filesAndSubFiles]
    )

    const getBySimilarName = useCallback(
        (name: string) => {
            return FileModel.getBySimilarName(filesActive, name)
        },
        [filesActive]
    )

    return {
        files: filesSorted,
        filesActive,
        getById,
        getBySimilarName,
    }
}
