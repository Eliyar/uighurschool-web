import { Close, SearchOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { TextField } from '../../common/TextField'
import { useLocalContext } from '../hooks/useLocalContext'

export const SearchField = () => {
    const { searchTerm, setSearchTerm } = useLocalContext().filters

    return (
        <TextField
            placeholder="Search"
            size="small"
            startIcon={<SearchOutlined color="secondary" sx={{ mr: 2 }} />}
            endIcon={
                searchTerm ? (
                    <IconButton onClick={() => setSearchTerm('')} size="small">
                        <Close fontSize="small" color="secondary" />
                    </IconButton>
                ) : undefined
            }
            value={searchTerm}
            onChange={setSearchTerm}
        />
    )
}
