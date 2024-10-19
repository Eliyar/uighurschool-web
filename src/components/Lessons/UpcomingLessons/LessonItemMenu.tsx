import { CameraOutlined, MoreVert } from '@mui/icons-material'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material'
import { useCallback, useState } from 'react'

import { openWheel } from '../../../controllers/open-wheel'

interface Props {
    wheelsUrl?: string
}

export const LessonItemMenu = ({ wheelsUrl }: Props) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorElUser(event.currentTarget)
    }, [])

    const onClose = useCallback(() => {
        setAnchorElUser(null)
    }, [])

    if (!wheelsUrl) {
        return null
    }

    return (
        <>
            <IconButton onClick={onOpen}>
                <MoreVert fontSize="small" />
            </IconButton>

            <Menu
                sx={{ mt: '40px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={onClose}
            >
                <MenuItem onClick={() => openWheel(wheelsUrl)}>
                    <ListItemIcon>
                        <CameraOutlined color="secondary" />
                    </ListItemIcon>
                    <ListItemText>Open Wheels</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}
