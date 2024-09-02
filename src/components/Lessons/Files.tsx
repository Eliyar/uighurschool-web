import { Grid } from '@mui/material'

import { useFiles } from '../../hooks/useFiles'
import { FileItem } from '../common/FileItem/FileItem'

export const Files = () => {
    const { filesActive } = useFiles()

    return (
        <Grid container spacing={2}>
            {filesActive.map((file, index) => (
                <Grid key={index} item xs={3}>
                    <FileItem file={file} />
                </Grid>
            ))}
        </Grid>
    )
}
