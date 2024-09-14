import { Stack, styled } from '@mui/material'
import classNames from 'classnames'

import Colors from '../../../colors'
import { Logo } from '../Logo'
import { Nav } from './Nav'

interface Props {
    className?: string
}

const Styles = styled(Stack)`
    padding: 8px;
    border-right: 1px solid ${Colors.BORDER_COLOR};
    background-color: ${Colors.BLUE}1F;

    & > img {
        margin-bottom: 40px !important;
    }
`

export const SideBar = ({ className }: Props) => {
    return (
        <Styles
            className={classNames(className)}
            alignItems="center"
            spacing={2}
        >
            <Logo />
            <Nav />
        </Styles>
    )
}
