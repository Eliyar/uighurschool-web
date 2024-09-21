import { produce } from 'immer'

import { Action } from '../actions'
import { State } from '../state'

export const processAddNavItem = (state: State, action: Action) => {
    const { navItem } = action.payload
    return produce(state, (draft) => {
        // if not exists, add
        const hasItem = draft.navItems.some((u) => u.id === navItem.id)
        if (!hasItem) {
            draft.navItems.push(navItem)
        }
    })
}

export const processRemoveNavItem = (state: State, action: Action) => {
    const { navItem } = action.payload
    return produce(state, (draft) => {
        draft.navItems = draft.navItems.filter((u) => u.id !== navItem.id)
    })
}
