import { Theme } from '@emotion/react'
import { Box, Breadcrumbs, SxProps } from '@mui/material'

interface Props {
    sx?: SxProps<Theme>
}

export const Navigation = ({ sx }: Props) => {
    return (
        <Breadcrumbs sx={sx}>
            <Box>
                <a href="/#">Uighur School</a>
            </Box>
            <Box>
                <a href="/#">Lessons</a>
            </Box>
        </Breadcrumbs>
    )
}
