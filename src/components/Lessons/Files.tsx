import { Grid } from '@mui/material'

import { FileItem } from '../common/FileItem/FileItem'
import { useLocalContext } from './hooks/useLocalContext'

export const Files = () => {
    const { files } = useLocalContext().files

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
