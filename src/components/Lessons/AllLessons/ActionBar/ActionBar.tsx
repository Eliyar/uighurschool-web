import { Stack, Typography } from '@mui/material'

import { FileUploaderDialogTrigger } from '../../../common/FileUploaderDialog/FileUploaderDialogTrigger'
import { FilterByTag } from './FilterByTag'
import { SearchField } from './SearchField'

export const ActionBar = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">All Files</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
                <FilterByTag />
                <SearchField />
                <FileUploaderDialogTrigger />
            </Stack>
        </Stack>
    )
}
