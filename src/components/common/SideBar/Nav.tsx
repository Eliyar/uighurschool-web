import {
    DescriptionTwoTone,
    EmailTwoTone,
    SchoolTwoTone,
} from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { useRoute } from '../../../hooks/useRoute'

export const Nav = () => {
    const { lessonsRoute, sendRoute } = useRoute()

    return (
        <Stack spacing={2}>
            <NavLink to={lessonsRoute}>
                {({ isActive }) => (
                    <IconButton
                        size="large"
                        color={isActive ? 'primary' : 'secondary'}
                    >
                        <DescriptionTwoTone fontSize="large" />
                    </IconButton>
                )}
            </NavLink>
            <NavLink to={sendRoute}>
                {({ isActive }) => (
                    <IconButton
                        size="large"
                        color={isActive ? 'primary' : 'secondary'}
                    >
                        <EmailTwoTone fontSize="large" />
                    </IconButton>
                )}
            </NavLink>
            <IconButton size="large">
                <SchoolTwoTone fontSize="large" />
            </IconButton>
        </Stack>
    )
}
