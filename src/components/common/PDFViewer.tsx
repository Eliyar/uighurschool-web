import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString()

interface Props {
    url: string
}

export const PDFViewer = ({ url }: Props) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()

    // const handleZoom = (props: any) => {
    //     // props?.viewer?.zoom('fitWidth')
    // }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {/* <Worker
                // workerUrl={
                //     // 'https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js'
                //     '../node_modules/pdfjs-dist/build/pdf.worker.min.mjs'
                // }
            > */}
            <Viewer
                fileUrl={url}
                plugins={[defaultLayoutPluginInstance]}
                // onZoom={handleZoom} // Fit PDF to page width when loaded
            />
            {/* </Worker> */}

            {/* <Document file={url} /> */}
        </div>
    )
}
