import { InfoOutlined } from '@mui/icons-material'
import { Alert, Box, Grid, Stack, Typography } from '@mui/material'
import { useCallback } from 'react'

import { useRoute } from '../../../hooks/useRoute'
import { FileModel } from '../../../services/models/File.model'
import { NavItem } from '../../../services/models/NavItem.model'
import { AddNavItem } from '../../../services/store/actions'
import { Button } from '../../common/Button'
import { FileItem } from '../../common/FileItem/FileItem'
import { useLocalContext } from './hooks/useLocalContext'

export const Files = () => {
    const { navViewFile } = useRoute()
    const { files } = useLocalContext().files
    const { searchTerm, setSearchTerm } = useLocalContext().filters

    const onView = useCallback(
        (file: FileModel) => {
            AddNavItem.dispatch(
                new NavItem(file.id, file.name, () => {
                    navViewFile(file.id)
                })
            )
        },
        [navViewFile]
    )

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
        <Grid container spacing={2} sx={{ width: '100%' }}>
            {files.map((file, index) => (
                <Grid key={index} item xs={3}>
                    <FileItem file={file} onView={onView} />
                </Grid>
            ))}
        </Grid>
    )
}
