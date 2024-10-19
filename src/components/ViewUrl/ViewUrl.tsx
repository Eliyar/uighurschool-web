import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useNavItems } from '../../hooks/useNavItems'
import { PDFViewer } from '../common/PDFViewer'
import { NotFoundPage } from '../Pages/NoteFoundPage'

export const ViewUrl = () => {
    const { id } = useParams<{ id: string }>()
    const { getById } = useNavItems()

    const navItem = useMemo(() => (id ? getById(id) : undefined), [getById, id])

    if (!navItem) {
        return <NotFoundPage message="URL not found" />
    }

    return <PDFViewer name={navItem.name} url={navItem.url} />
}
