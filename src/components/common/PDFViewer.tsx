import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Stack } from '@mui/material'
import {
    SpecialZoomLevel,
    Viewer,
    Worker,
    ZoomEvent,
} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import { useEffect } from 'react'

interface Props {
    name?: string
    url: string
}

const workerUrl =
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/build/pdf.worker.min.js'

export const PDFViewer = ({ url }: Props) => {
    const zoomPluginInstance = zoomPlugin()
    const { Zoom, ZoomOut, ZoomIn, zoomTo } = zoomPluginInstance

    // Zoom to page width on mount
    useEffect(() => {
        zoomTo(SpecialZoomLevel.PageWidth)
    }, [zoomTo])

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [],
        renderToolbar: (props) => (
            <Stack
                {...props}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
                gap={1}
                sx={{ width: '100%' }}
            >
                {/* <Typography variant="body1" fontWeight={500}>
                    {name ?? ''}
                </Typography> */}
                <Stack direction="row" alignItems="center" spacing={1}>
                    <ZoomOut />
                    <Zoom />
                    <ZoomIn />
                </Stack>
            </Stack>
        ),
    })

    const handleZoom = (event: ZoomEvent) => {
        console.log('event:', event)
    }

    return (
        <Worker workerUrl={workerUrl}>
            <Viewer
                fileUrl={url}
                plugins={[defaultLayoutPluginInstance, zoomPluginInstance]}
                onZoom={handleZoom}
            />
        </Worker>
    )
}
