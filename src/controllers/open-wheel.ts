import { utilsService } from '../services/firebase/utils.service'

export const openWheel = (wheelsUrl: string) => {
    utilsService.openUrl(wheelsUrl)
}
