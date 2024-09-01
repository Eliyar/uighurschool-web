import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { MAX_UPLOAD_PAGES } from '../../constants'
import { firebaseService } from '../../services/firebase/firebase.service'
import { FileModel } from '../../services/models/File.model'
import { pdfService } from '../../services/pdfService'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'
import { TextField } from '../common/TextField'

export const FileUploader = () => {
    const [file, setFile] = useState<File | undefined>(undefined)

    const onUpload = useCallback(async () => {
        if (!file) {
            return
        }

        // TODO: check max file size

        let fileModel: FileModel | undefined
        try {
            const downloadUrl = await firebaseService.storage.uploadFile(file)
            fileModel = FileModel.fromFile(file, downloadUrl)
        } catch (error) {
            // TODO: display toast
            console.error('Error splitting PDF:', error)
        }

        try {
            const allPages = await pdfService.splitPdfPages(file)
            const pagesToUpload = allPages.slice(0, MAX_UPLOAD_PAGES)

            for (const page of pagesToUpload) {
                try {
                    const downloadUrl =
                        await firebaseService.storage.uploadFile(page)
                    const subFile: FileModel = FileModel.fromFile(
                        page,
                        downloadUrl
                    )
                    fileModel?.subFiles?.push(subFile)
                } catch (error) {
                    console.error('Error uploading page:', error)
                }
            }
        } catch (error) {
            console.error('Error splitting PDF:', error)
        }

        if (!fileModel) {
            // TODO: display error toast
            return
        }

        try {
            await firebaseService.db.createFile(fileModel)

            // TODO: display success toast
        } catch (error) {
            console.error('Error creating file:', error)
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
