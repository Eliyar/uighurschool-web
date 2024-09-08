import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { uploadFile } from '../../controllers/upload-file'
import { useFiles } from '../../hooks/useFiles'
import { utilsService } from '../../services/firebase/utils.service'
import { BrowseFile } from '../common/BrowseFile'
import { Button } from '../common/Button'
import { Files } from './Files'

interface Props {
    onUploaded(): void
    onClose?(
        event: React.SyntheticEvent,
        reason: 'backdropClick' | 'escapeKeyDown'
    ): void
}

export const FileUploader = ({ onUploaded, onClose }: Props) => {
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
            onUploaded()
        })
    }, [files, onUploaded, getBySimilarName])

    return (
        <Stack spacing={2}>
            {files?.length > 0 ? (
                <>
                    <Files files={files} />
                    <Button
                        variant="contained"
                        label="Upload"
                        onClick={onUpload}
                        isLoading={isLoading}
                    />
                </>
            ) : (
                <>
                    <BrowseFile onChange={setFiles} />
                    <Button
                        color="secondary"
                        label="Cancel"
                        onClick={(event) => onClose?.(event, 'backdropClick')}
                    />
                </>
            )}
        </Stack>
    )
}
