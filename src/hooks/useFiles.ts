import { useSelector } from 'react-redux'

import { State } from '../services/store/state'

export const useFiles = () => {
    const files = useSelector((state: State) => state.files)

    const filesActive = files.filter((file) => !file.deletedAt)

    return {
        files,
        filesActive,
    }
}
