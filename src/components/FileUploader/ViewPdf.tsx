import 'pdfjs-dist/webpack'

import { Stack, styled } from '@mui/material'
import { getDocument } from 'pdfjs-dist'
import { useEffect, useRef } from 'react'

import Colors from '../../colors'

interface Props {
    file: File
}

const Styles = styled(Stack)`
    width: 100%;
    padding: 32px;
    background: ${Colors.BLUE}99;
    overflow-x: auto;
    box-sizing: border-box;

    canvas {
        width: auto;
        height: 60vh;
        border-radius: 8px;
    }
`

export const ViewPdf = ({ file }: Props) => {
    const elRef = useRef<any>(null)

    useEffect(() => {
        const renderPdf = async (file: File) => {
            try {
                // Read the file as an ArrayBuffer
                const fileReader = new FileReader()
                fileReader.onload = async (event: any) => {
                    const pdfData = event.target.result

                    // Load the PDF
                    const pdf = await getDocument({ data: pdfData }).promise

                    // Get the first page
                    const page = await pdf.getPage(1)

                    // Set up canvas
                    const viewport = page.getViewport({ scale: 1 })
                    const canvas = document.createElement('canvas')
                    const context = canvas.getContext('2d')!
                    canvas.height = viewport.height
                    canvas.width = viewport.width
                    // elRef.current!.innerHTML = ''
                    elRef.current!.appendChild(canvas)

                    // Render the page onto the canvas
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    }
                    await page.render(renderContext).promise
                }

                // Read the file as an ArrayBuffer
                fileReader.readAsArrayBuffer(file)
            } catch (err) {
                console.error('Failed to load PDF document:', err)
            }
        }

        if (file) {
            renderPdf(file)
        }
    }, [file])

    return (
        <Styles
            ref={elRef}
            direction="row"
            justifyContent="center"
            spacing={3}
        ></Styles>
    )
}
