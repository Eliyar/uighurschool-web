import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { uploadFile } from '../../controllers/upload-file'
import { useFiles } from '../../hooks/useFiles'
import { useHttp } from '../../hooks/useHttp'
import { utilsService } from '../../services/firebase/utils.service'
import { FileModel } from '../../services/models/File.model'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'
import { TextField } from '../common/TextField'

export const FileUploader = () => {
    const { getBySimilarName } = useFiles()
    const [file, setFile] = useState<File | undefined>(undefined)
    const { isLoading, uploadRef } = useHttpReq()

    const onUpload = useCallback(async () => {
        if (!file) {
            return
        }

        try {
            const fileName = utilsService.removeFileExt(file.name)
            const similarFiles = getBySimilarName(fileName)
            await uploadRef(file, similarFiles)
            // TODO: display toast message
        } catch (error) {
            // TODO: display toast message
            console.error(error)
        }
    }, [file, getBySimilarName, uploadRef])

    return (
        <Stack spacing={2}>
            <BrowseFile onChange={setFile} />

            <TextField
                label="File Name"
                value={file?.name ?? ''}
                onChange={() => {}}
            />

            <Button label="Upload" onClick={onUpload} isLoading={isLoading} />
        </Stack>
    )
}

const useHttpReq = () => {
    const { isLoading, sendRequest } = useHttp()

    const uploadRef = useCallback(
        (file: File | undefined, similarFiles: FileModel[]) =>
            sendRequest(uploadFile.bind(null, file, similarFiles)),
        [sendRequest]
    )

    return {
        isLoading,
        uploadRef,
    }
}
