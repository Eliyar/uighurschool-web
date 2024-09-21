import { useSelector } from 'react-redux'

import { State } from '../services/store/state'

export const useNavItems = () => {
    const navItems = useSelector((state: State) => state.navItems)

    return {
        navItems,
    }
}
