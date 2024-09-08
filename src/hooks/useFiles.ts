import Fuse from 'fuse.js'
import { useSelector } from 'react-redux'

import { State } from '../services/store/state'

export const useFiles = () => {
    const files = useSelector((state: State) => state.files)

    const filesActive = files.filter((file) => !file.deletedAt)

    const getBySimilarName = (name: string) => {
        const fuse = new Fuse(filesActive, {
            keys: ['name'],
            isCaseSensitive: false,
            threshold: 0.2,
        })
        return fuse.search(name).map((item) => item.item)
    }

    return {
        files,
        filesActive,
        getBySimilarName,
    }
}
