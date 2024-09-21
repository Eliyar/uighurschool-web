import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { State } from '../services/store/state'

export const useNavItems = () => {
    const navItems = useSelector((state: State) => state.navItems)

    const getById = useCallback(
        (id: string) => navItems.find((item) => item.id === id),
        [navItems]
    )

    return {
        navItems,
        getById,
    }
}
