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
import { utilsService } from '../../../services/firebase/utils.service'
import { FileModel } from '../../../services/models/File.model'
import { DeleteFile } from '../Actions/DeleteFile'

interface Props {
    file: FileModel
}

export const FileMenu = ({ file }: Props) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setAnchorElUser(event.currentTarget)
        },
        []
    )

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null)
    }, [])

    return (
        <>
            <IconButton onClick={handleOpenUserMenu}>
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
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    key={file.id}
                    onClick={() => {
                        utilsService.openUrl(file.downloadUrl)
                        handleCloseUserMenu()
                    }}
                >
                    <ListItemIcon>
                        <Visibility color="secondary" />
                    </ListItemIcon>
                    <ListItemText>All Pages</ListItemText>
                </MenuItem>

                {file.subFiles?.map((file, index) => (
                    <MenuItem
                        key={file.id}
                        onClick={() => {
                            utilsService.openUrl(file.downloadUrl)
                            handleCloseUserMenu()
                        }}
                    >
                        <ListItemIcon>
                            <Visibility color="secondary" />
                        </ListItemIcon>
                        <ListItemText>{`Page ${index + 1}`}</ListItemText>
                    </MenuItem>
                ))}

                <MenuItem divider />

                <DeleteFile fileId={file.id}>
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
