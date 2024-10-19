import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Stack, styled } from '@mui/material'
import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core'
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
    const { zoomTo, Zoom, ZoomIn, ZoomOut } = zoomPluginInstance

    // Zoom to page width on mount
    useEffect(() => {
        zoomTo(SpecialZoomLevel.PageWidth)
    }, [zoomTo])

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [],
        renderToolbar: () => <></>,
    })

    return (
        <Worker workerUrl={workerUrl}>
            <ZoomControls
                zoomNode={<Zoom />}
                zoomInNode={<ZoomIn />}
                zoomOutNode={<ZoomOut />}
            />
            <Viewer
                fileUrl={url}
                plugins={[defaultLayoutPluginInstance, zoomPluginInstance]}
            />
        </Worker>
    )
}

const ZoomControlsStyles = styled(Stack)`
    padding: 4px;
    position: absolute;
    top: 16px;
    right: 40px;
    z-index: 1000;
    display: inline-flex;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid ${({ theme }) => theme.palette.divider};
    border-radius: 6px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    font-weight: bold;
`

const ZoomControls = ({
    zoomNode,
    zoomInNode,
    zoomOutNode,
}: {
    zoomNode: React.ReactNode
    zoomInNode: React.ReactNode
    zoomOutNode: React.ReactNode
}) => {
    return (
        <ZoomControlsStyles
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                {zoomOutNode}
                {zoomNode}
                {zoomInNode}
            </Stack>
        </ZoomControlsStyles>
    )
}
