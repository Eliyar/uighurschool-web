import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Viewer, Worker, ZoomEvent } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

interface Props {
    url: string
}

const workerUrl =
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/build/pdf.worker.min.js'

export const PDFViewer = ({ url }: Props) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()

    const handleZoom = (event: ZoomEvent) => {
        console.log('event:', event)
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Worker workerUrl={workerUrl}>
                <Viewer
                    fileUrl={url}
                    plugins={[defaultLayoutPluginInstance]}
                    onZoom={handleZoom}
                />
            </Worker>
        </div>
    )
}
