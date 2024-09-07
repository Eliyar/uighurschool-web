import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { uploadFile } from '../../controllers/upload-file'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'
import { TextField } from '../common/TextField'

export const FileUploader = () => {
    const [file, setFile] = useState<File | undefined>(undefined)

    const onUpload = useCallback(async () => {
        try {
            await uploadFile(file)
            // TODO: display toast message
        } catch (error) {
            // TODO: display toast message
            console.error(error)
        }
    }, [file])

    return (
        <Stack spacing={2}>
            <BrowseFile onChange={setFile} />

            <TextField
                label="File Name"
                value={file?.name ?? ''}
                onChange={() => {}}
            />

            <Button label="Upload" onClick={onUpload} />
        </Stack>
    )
}
