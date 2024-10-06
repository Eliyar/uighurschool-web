import { InfoOutlined } from '@mui/icons-material'
import { Alert, Box, Grid2, Stack, Typography } from '@mui/material'
import { useCallback } from 'react'

import { openFile } from '../../../controllers/open-file'
import { FileModel } from '../../../services/models/File.model'
import { Button } from '../../common/Button'
import { FileItem } from '../../common/FileItem/FileItem'
import { useLocalContext } from './hooks/useLocalContext'

export const Files = () => {
    const { files } = useLocalContext().files
    const { searchTerm, setSearchTerm } = useLocalContext().filters

    const onView = useCallback((file: FileModel) => {
        openFile(file)
    }, [])

    if (!files.length) {
        return (
            <Alert color="warning" icon={<InfoOutlined />}>
                {searchTerm ? (
                    <Stack spacing={2}>
                        <Box>
                            No lessons found for &quot;
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                component="span"
                            >
                                {searchTerm}
                            </Typography>
                            &quot;
                        </Box>
                        <Button
                            variant="outlined"
                            color="info"
                            label="Clear Search"
                            onClick={() => setSearchTerm('')}
                            size="small"
                            sx={{ width: 'fit-content' }}
                        />
                    </Stack>
                ) : (
                    'No lessons exist'
                )}
            </Alert>
        )
    }

    return (
        <Grid2 container spacing={2} sx={{ width: '100%' }}>
            {files.map((file, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <FileItem file={file} onView={onView} />
                </Grid2>
            ))}
        </Grid2>
    )
}
