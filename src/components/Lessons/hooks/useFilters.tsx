import { useState } from 'react'

import { FileTag } from '../../../services/models/File.model'

export interface FiltersHookState {
    tag: FileTag | 'all'
    searchTerm: string
    setTag: (tag: FileTag | 'all') => void
    setSearchTerm: (searchTerm: string) => void
}

export const useFilters = () => {
    const [tag, setTag] = useState<FileTag | 'all'>('all')
    const [searchTerm, setSearchTerm] = useState<string>('')

    return {
        tag,
        searchTerm,
        setTag,
        setSearchTerm,
    }
}
