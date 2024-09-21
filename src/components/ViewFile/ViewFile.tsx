import { Stack } from '@mui/material'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useFiles } from '../../hooks/useFiles'
import { Iframe } from '../common/Iframe'
import { NotFoundPage } from '../Pages/NoteFoundPage'

export const ViewFile = () => {
    const { fileId } = useParams<{ fileId: string }>()
    const { getById } = useFiles()

    const file = useMemo(
        () => (fileId ? getById(fileId) : undefined),
        [getById, fileId]
    )

    if (!file?.downloadUrl) {
        return <NotFoundPage message="File not found" />
    }

    return (
        <Stack height="90vh">
            <Iframe src={file.downloadUrl} />
        </Stack>
    )
}
