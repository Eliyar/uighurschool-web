import { Stack } from '@mui/material'

import { FileUploaderDialogTrigger } from '../../common/FileUploaderDialog/FileUploaderDialogTrigger'
import { FilterByTag } from './FilterByTag'
import { SearchField } from './SearchField'

export const ActionBar = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <FilterByTag />

            <Stack direction="row" spacing={1}>
                <SearchField />
                <FileUploaderDialogTrigger />
            </Stack>
        </Stack>
    )
}
