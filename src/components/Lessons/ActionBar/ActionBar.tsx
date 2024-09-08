import { Box, Stack } from '@mui/material'

import { FilterByTag } from '../FilterByTag'

export const ActionBar = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <FilterByTag />

            <Box>[Search File]</Box>
        </Stack>
    )
}
