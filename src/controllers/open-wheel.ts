import { NavItem } from '../services/models/NavItem.model'
import { AddNavItem } from '../services/store/actions'

export const openWheel = () => {
    // TODO: replace dummy wheel
    const navItem = new NavItem(
        '1',
        'Wheels',
        'https://wheelofnames.com/dwx-f8j'
    )
    AddNavItem.dispatch(navItem)
}
