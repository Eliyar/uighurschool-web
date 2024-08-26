import {
    DescriptionTwoTone,
    EmailTwoTone,
    SchoolTwoTone,
} from '@mui/icons-material'
import { IconButton, Stack, styled } from '@mui/material'
import classNames from 'classnames'

import Colors from '../../colors'
import { Logo } from '../common/Logo'

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

            <IconButton size="large">
                <DescriptionTwoTone fontSize="large" />
            </IconButton>
            <IconButton size="large">
                <EmailTwoTone fontSize="large" />
            </IconButton>
            <IconButton size="large">
                <SchoolTwoTone fontSize="large" />
            </IconButton>
        </Styles>
    )
}
