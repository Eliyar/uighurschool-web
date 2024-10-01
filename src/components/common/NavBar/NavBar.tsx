import { Close, Home } from '@mui/icons-material'
import {
    ButtonBase,
    Divider,
    IconButton,
    Stack,
    styled,
    Tab,
    Tabs,
    Typography,
} from '@mui/material'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'

import Colors from '../../../colors'
import {
    deleteAllNavItems,
    deleteNavItem,
} from '../../../controllers/delete-navitem'
import { useNavItems } from '../../../hooks/useNavItems'
import { useRoute } from '../../../hooks/useRoute'
import { Button } from '../Button'
import { Logo } from '../Logo'

const Styles = styled(Stack)`
    height: 68px;
    border-bottom: 1px solid ${Colors.BORDER_COLOR};
    background-color: ${Colors.BLUE}1F;
`

export const NavBar = () => {
    const { lessonsRoute, navLessons } = useRoute()

    return (
        <Styles direction="row" alignItems="center" spacing={2} padding={1}>
            <ButtonBase onClick={() => navLessons()}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Logo />
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="primary"
                        noWrap
                    >
                        Uighur School
                    </Typography>
                </Stack>
            </ButtonBase>
            <Divider orientation="vertical" />
            <NavLink to={lessonsRoute}>
                {({ isActive }) => (
                    <IconButton
                        color={isActive ? 'primary' : 'default'}
                        size="large"
                    >
                        <Home />
                    </IconButton>
                )}
            </NavLink>
            <NavItems />
        </Styles>
    )
}

const NavItems = () => {
    const { id } = useParams<{ id: string }>()
    const { navLessons, navViewUrl } = useRoute()
    const { navItems } = useNavItems()

    return (
        <>
            <Tabs
                value={false}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ flex: '1 1 100%', width: '100px', minWidth: '100px' }}
            >
                {navItems.map((navItem) => {
                    const isActive = navItem.id === id

                    return (
                        <Tab
                            key={navItem.id}
                            label={
                                <Button
                                    key={navItem.id}
                                    variant={
                                        isActive ? 'contained' : 'outlined'
                                    }
                                    label={navItem.name}
                                    onClick={() => {
                                        navViewUrl(navItem.id)
                                    }}
                                    endIcon={
                                        <IconButton
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                deleteNavItem(navItem)
                                                if (isActive) {
                                                    navLessons()
                                                }
                                            }}
                                            sx={{ ml: 1 }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                    }
                                    sx={{ pr: 1, mr: 1, whiteSpace: 'nowrap' }}
                                />
                            }
                            sx={{ p: 0 }}
                        />
                    )
                })}
            </Tabs>

            {navItems.length > 0 && (
                <IconButton
                    onClick={() => {
                        deleteAllNavItems()
                        navLessons()
                    }}
                >
                    <Close />
                </IconButton>
            )}
        </>
    )
}
