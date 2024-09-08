import { ToggleButton, ToggleButtonGroup } from '@mui/material'

import { useLocalContext } from './hooks/useLocalContext'

export const FilterByTag = () => {
    const { tag, setTag } = useLocalContext().filters

    return (
        <ToggleButtonGroup
            exclusive
            value={tag}
            onChange={(_, value) => setTag(value)}
        >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="lesson">Lessons</ToggleButton>
            <ToggleButton value="story">Stories</ToggleButton>
        </ToggleButtonGroup>
    )
}
