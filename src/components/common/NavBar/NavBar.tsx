import { Home } from '@mui/icons-material'
import { Divider, IconButton, Stack, styled } from '@mui/material'

import Colors from '../../../colors'
import { Logo } from '../Logo'

const Styles = styled(Stack)`
    border-bottom: 1px solid ${Colors.BORDER_COLOR};
    background-color: ${Colors.BLUE}1F;
`

export const NavBar = () => {
    return (
        <Styles direction="row" alignItems="center" spacing={1} padding={1}>
            <Logo />
            <Divider orientation="vertical" />
            <IconButton size="large">
                <Home />
            </IconButton>
        </Styles>
    )
}
