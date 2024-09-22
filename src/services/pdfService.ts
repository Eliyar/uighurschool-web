import { PDFDocument } from 'pdf-lib'

import { utilsService } from './firebase/utils.service'

const splitPdfPages = async (file: File): Promise<File[]> => {
    return new Promise((resolve, reject) => {
        let fileName = utilsService.removeFileExt(file.name)
        fileName = utilsService.formatFileName(fileName)

        try {
            // Read the file as an ArrayBuffer
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = async (event: any) => {
                const pdfData = event.target.result

                // Load the PDF
                const pdf = await PDFDocument.load(pdfData)
                const pageCount = pdf.getPageCount()
                if (pageCount === 1) {
                    return resolve([])
                }

                // Loop through each page in the PDF
                const pageFiles = []
                for (let i = 0; i < pageCount; i++) {
                    const newPdf = await PDFDocument.create()
                    const [copiedPage] = await newPdf.copyPages(pdf, [i])
                    newPdf.addPage(copiedPage)

                    // Convert the page to a Blob
                    const pdfBytes = await newPdf.save()
                    const blob = new Blob([pdfBytes], {
                        type: 'application/pdf',
                    })

                    // Convert Blob to File
                    const pageFileName = `${fileName} - Page ${i + 1}.pdf`
                    const pageFile = new File([blob], pageFileName, {
                        type: 'application/pdf',
                    })

                    pageFiles.push(pageFile)
                }

                return resolve(pageFiles)
            }
        } catch (error) {
            console.error(
                'Failed to split PDF document into separate pages:',
                error
            )
            return reject(error)
        }
    })
}

export const pdfService = {
    splitPdfPages,
}
