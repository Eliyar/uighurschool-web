import { Stack, Typography } from '@mui/material'

import { FileUploaderDialogTrigger } from '../../../common/FileUploaderDialog/FileUploaderDialogTrigger'
import { ActionBarStyles } from '../../../common/styles/styles'
import { FilterByTag } from './FilterByTag'
import { SearchField } from './SearchField'

export const ActionBar = () => {
    return (
        <ActionBarStyles
            sx={{
                flexDirection: {
                    xs: 'column',
                    sm: 'row',
                },
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">All Files</Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <FilterByTag />
                <SearchField />
                <FileUploaderDialogTrigger />
            </Stack>
        </ActionBarStyles>
    )
}
