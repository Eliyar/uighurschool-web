import {
    styled,
    ToggleButton,
    toggleButtonClasses,
    ToggleButtonGroup,
    toggleButtonGroupClasses,
} from '@mui/material'

import Colors from '../../../colors'
import { useLocalContext } from '../hooks/useLocalContext'

const Styles = styled(ToggleButtonGroup)`
    &.${toggleButtonGroupClasses.root} {
        padding: 2px;
        background-color: ${Colors.CONTROLLER_BACKGROUND};
    }

    .${toggleButtonClasses.root} {
        padding-left: 12px;
        padding-right: 12px;
        background-color: transparent;
        border: 0;
        text-transform: none;
        border-radius: 6px;
    }

    .${toggleButtonClasses.selected} {
        background-color: white;
        border: 1px solid ${Colors.BORDER_COLOR};
    }
`

export const FilterByTag = () => {
    const { tag, setTag } = useLocalContext().filters

    return (
        <Styles
            exclusive
            size="small"
            value={tag}
            onChange={(_, value) => setTag(value ?? 'all')}
        >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="lesson">Lessons</ToggleButton>
            <ToggleButton value="story">Stories</ToggleButton>
        </Styles>
    )
}
