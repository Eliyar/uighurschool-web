import { InfoOutlined } from '@mui/icons-material'
import { Alert, Grid } from '@mui/material'

import { FileItem } from '../common/FileItem/FileItem'
import { useLocalContext } from './hooks/useLocalContext'

export const Files = () => {
    const { files } = useLocalContext().files
    const { searchTerm } = useLocalContext().filters

    if (!files.length) {
        return (
            <Alert color="warning" icon={<InfoOutlined />}>
                {searchTerm
                    ? `No lessons found for "${searchTerm}"`
                    : 'No lessons exist'}
            </Alert>
        )
    }

    return (
        <Grid container spacing={2}>
            {files.map((file, index) => (
                <Grid key={index} item xs={3}>
                    <FileItem file={file} />
                </Grid>
            ))}
        </Grid>
    )
}
