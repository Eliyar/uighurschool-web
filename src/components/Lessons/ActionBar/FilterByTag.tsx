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
        padding-left: 16px;
        padding-right: 16px;
        background-color: transparent;
        border: 0;
        text-transform: none;
        border-radius: 6px;
    }

    .${toggleButtonClasses.selected} {
        background-color: white !important;
        border: 1px solid ${Colors.BORDER_COLOR};
    }
`

export const FilterByTag = () => {
    const { tag, setTag } = useLocalContext().filters

    return (
        <Styles
            exclusive
            value={tag}
            onChange={(_, value) => setTag(value ?? 'all')}
        >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="lesson">Lessons</ToggleButton>
            <ToggleButton value="story">Stories</ToggleButton>
        </Styles>
    )
}
