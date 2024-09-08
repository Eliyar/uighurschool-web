import { useMemo } from 'react'

import { useFiles as useFilesHook } from '../../../hooks/useFiles'
import { FileModel } from '../../../services/models/File.model'
import { FiltersHookState } from './useFilters'

export interface FilesHookState {
    files: FileModel[]
}

export const useFiles = ({
    tag,
    searchTerm,
}: FiltersHookState): FilesHookState => {
    const { filesActive } = useFilesHook()

    const filesFiltered = useMemo(() => {
        // Filter by tag
        let filtered = filesActive.filter((file) => {
            if (tag === 'all') return true
            return file.tag === tag
        })

        // Filter by searchTerm
        if (searchTerm) {
            filtered = FileModel.getBySimilarName(filtered, searchTerm)
        }

        return filtered
    }, [tag, searchTerm, filesActive])

    return {
        files: filesFiltered,
    }
}
