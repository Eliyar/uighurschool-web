import { MAX_UPLOAD_PAGES } from '../constants'
import { firebaseService } from '../services/firebase/firebase.service'
import { FileModel } from '../services/models/File.model'
import { pdfService } from '../services/pdfService'
import { FilesAdded } from '../services/store/actions'

export const uploadFile = async (
    file: File | undefined
): Promise<FileModel> => {
    if (!file) {
        return Promise.reject('No file provided')
    }

    // TODO: check max file size

    // Upload base file
    let fileModel: FileModel | undefined
    try {
        const downloadUrl = await firebaseService.storage.uploadFile(file)
        fileModel = FileModel.fromFile(file, downloadUrl)
    } catch (error) {
        // TODO: display toast
        console.error('Error splitting PDF:', error)
        return Promise.reject(error)
    }

    // Split file into separate pages and upload them
    try {
        const allPages = await pdfService.splitPdfPages(file)
        const pagesToUpload = allPages.slice(0, MAX_UPLOAD_PAGES)

        for (const page of pagesToUpload) {
            try {
                const downloadUrl = await firebaseService.storage.uploadFile(
                    page
                )
                const subFile: FileModel = FileModel.fromFile(page, downloadUrl)
                fileModel.subFiles?.push(subFile)
            } catch (error) {
                console.error('Error uploading page:', error)
                return Promise.reject(error)
            }
        }
    } catch (error) {
        console.error('Error splitting PDF:', error)
        return Promise.reject(error)
    }

    // Create file in database
    try {
        await firebaseService.db.createFile(fileModel)
    } catch (error) {
        console.error('Error creating file:', error)
        return Promise.reject(error)
    }

    // Add file to store
    FilesAdded.dispatch([fileModel])

    return Promise.resolve(fileModel)
}
