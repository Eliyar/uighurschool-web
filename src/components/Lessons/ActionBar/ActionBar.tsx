import { Stack } from '@mui/material'

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
            <SearchField />
        </Stack>
    )
}
