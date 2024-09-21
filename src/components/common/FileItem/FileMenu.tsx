import { DeleteOutline, MoreVert, Visibility } from '@mui/icons-material'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material'
import { useCallback, useState } from 'react'

import Colors from '../../../colors'
import { FileModel } from '../../../services/models/File.model'
import { NavItem } from '../../../services/models/NavItem.model'
import { AddNavItem } from '../../../services/store/actions'
import { DeleteFile } from '../Actions/DeleteFile'

interface Props {
    file: FileModel
}

export const FileMenu = ({ file }: Props) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorElUser(event.currentTarget)
    }, [])

    const onClose = useCallback(() => {
        setAnchorElUser(null)
    }, [])

    const onView = useCallback(
        (event: React.MouseEvent<HTMLElement>, _file: FileModel) => {
            event.stopPropagation()
            AddNavItem.dispatch(
                new NavItem(_file.id, _file.name, _file.downloadUrl)
            )
            onClose()
        },
        [onClose]
    )

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
                <MenuItem
                    key={file.id}
                    onClick={(event) => onView(event, file)}
                >
                    <ListItemIcon>
                        <Visibility color="secondary" />
                    </ListItemIcon>
                    <ListItemText>All Pages</ListItemText>
                </MenuItem>

                {file.subFiles?.map((file, index) => (
                    <MenuItem
                        key={file.id}
                        onClick={(event) => onView(event, file)}
                    >
                        <ListItemIcon>
                            <Visibility color="secondary" />
                        </ListItemIcon>
                        <ListItemText>{`Page ${index + 1}`}</ListItemText>
                    </MenuItem>
                ))}

                <MenuItem divider />

                <DeleteFile fileId={file.id} onDeleted={() => onClose()}>
                    <MenuItem>
                        <ListItemIcon>
                            <DeleteOutline color="error" />
                        </ListItemIcon>
                        <ListItemText sx={{ color: `${Colors.RED}` }}>
                            Delete File
                        </ListItemText>
                    </MenuItem>
                </DeleteFile>
            </Menu>
        </>
    )
}
