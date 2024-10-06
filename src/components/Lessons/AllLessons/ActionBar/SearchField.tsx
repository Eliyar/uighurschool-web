import { Close, SearchOutlined } from '@mui/icons-material'
import { IconButton, inputBaseClasses, styled } from '@mui/material'

import { TextField } from '../../../common/TextField'
import { useLocalContext } from '../hooks/useLocalContext'

const Styles = styled(TextField)`
    height: 44px;

    .${inputBaseClasses.root} {
        height: 44px;
    }
`

export const SearchField = () => {
    const { searchTerm, setSearchTerm } = useLocalContext().filters

    return (
        <Styles
            placeholder="Search"
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
            sx={{ height: '44px' }}
        />
    )
}
