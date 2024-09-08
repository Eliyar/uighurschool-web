import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { uploadFile } from '../../controllers/upload-file'
import { useFiles } from '../../hooks/useFiles'
import { utilsService } from '../../services/firebase/utils.service'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'

export const FileUploader = () => {
    const { getBySimilarName } = useFiles()
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const onUpload = useCallback(async () => {
        if (!files?.length) {
            return
        }

        setIsLoading(true)
        const promises = files.map((file) => {
            const fileName = utilsService.removeFileExt(file.name)
            const similarFiles = getBySimilarName(fileName)
            return uploadFile(file, similarFiles)
        })

        Promise.all(promises).finally(() => {
            // TODO: display toast message
            setIsLoading(false)
        })
    }, [files, getBySimilarName])

    return (
        <Stack spacing={2}>
            <BrowseFile onChange={setFiles} />
            <Button label="Upload" onClick={onUpload} isLoading={isLoading} />
        </Stack>
    )
}
