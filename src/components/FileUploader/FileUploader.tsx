import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { pdfService } from '../../services/pdfService'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'
import { Checkbox } from '../common/Checkbox'
import { TextField } from '../common/TextField'

export const FileUploader = () => {
    const [file, setFile] = useState<File | undefined>(undefined)

    const onUpload = useCallback(async () => {
        if (!file) {
            return
        }

        const pages = await pdfService.splitPdfPages(file)
        console.log('pages:', pages)
    }, [file])

    return (
        <Stack spacing={2} sx={{ p: 3 }}>
            <BrowseFile onChange={setFile} />

            <TextField
                label="File Name"
                value={file?.name ?? ''}
                onChange={() => {}}
            />

            <Checkbox value={false} onChange={() => {}} label="Split pages" />

            <Button label="Split PDF" onClick={onUpload} />
        </Stack>
    )
}
