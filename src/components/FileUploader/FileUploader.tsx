import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { uploadFile } from '../../controllers/upload-file'
import { useHttp } from '../../hooks/useHttp'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'
import { TextField } from '../common/TextField'

export const FileUploader = () => {
    const [file, setFile] = useState<File | undefined>(undefined)
    const { isLoading, uploadRef } = useHttpReq()

    const onUpload = useCallback(async () => {
        try {
            await uploadRef(file)
            // TODO: display toast message
        } catch (error) {
            // TODO: display toast message
            console.error(error)
        }
    }, [file, uploadRef])

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
        (file: File | undefined) => sendRequest(uploadFile.bind(null, file)),
        [sendRequest]
    )

    return {
        isLoading,
        uploadRef,
    }
}
