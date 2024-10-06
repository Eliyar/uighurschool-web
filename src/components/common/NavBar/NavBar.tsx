import { Close } from '@mui/icons-material'
import { ButtonBase, IconButton, Stack, styled, Tab, Tabs } from '@mui/material'
import { useParams } from 'react-router'

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
    const { navLessons } = useRoute()

    return (
        <Styles direction="row" alignItems="center" spacing={1} paddingX={1}>
            <ButtonBase
                onClick={() => navLessons()}
                sx={{ borderRadius: '13px' }}
            >
                <Logo />
            </ButtonBase>
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
                allowScrollButtonsMobile
                sx={{ flex: '1 1 100%', width: '100px' }}
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
