import { Stack } from '@mui/material'
import { useMemo } from 'react'

import { FileModel } from '../../services/models/File.model'
import { FileItem } from '../common/FileItem/FileItem'

interface Props {
    files: File[]
}

export const Files = ({ files }: Props) => {
    const fileModels = useMemo(
        () => files?.map((file) => FileModel.fromFile(file, '')),
        [files]
    )

    if (!fileModels.length) {
        return null
    }

    return (
        <Stack spacing={2}>
            {fileModels.map((file, index) => (
                <FileItem key={index} file={file} hideMenu />
            ))}
        </Stack>
    )
}
