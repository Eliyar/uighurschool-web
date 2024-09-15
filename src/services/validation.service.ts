const isEmailRe =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isEmail = (str: string) => {
    return isEmailRe.test(str)
}

const isNumericRe = /^\d+$/
const isNumeric = (str: string): boolean => {
    if (typeof str !== 'string') return false
    return isNumericRe.test(str)
}

const isEntered = (str: string | null | undefined): boolean => {
    return !!str?.length
}

const isMinLength = (str: string, length: number): boolean => {
    return str.length >= length
}

const isMaxLength = (str: string, length: number): boolean => {
    return str.length <= length
}

const containsLowerCaseRe = /[a-z]/
const containsLowerCase = (str: string): boolean => {
    return containsLowerCaseRe.test(str)
}

const containsUpperCaseRe = /[A-Z]/
const containsUpperCase = (str: string): boolean => {
    return containsUpperCaseRe.test(str)
}

const conatinsNumberRe = /[0-9]/
const containsNumber = (str: string): boolean => {
    return conatinsNumberRe.test(str)
}

const isDate = (str: string): boolean => {
    const date = Date.parse(str)
    if (isNaN(date)) return false

    if (!validateDateFormat(str)) return false

    return true
}

// eslint-disable-next-line no-useless-escape
const dateRe = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
const validateDateFormat = (str: string): boolean => {
    if (!str.match(dateRe)) {
        return false
    }

    const operator1 = str.split('/')
    const operator2 = str.split('-')

    // Extract the string into month, date and year
    let pdate: string[]
    if (operator1.length > 1) {
        pdate = str.split('/')
    } else if (operator2.length > 1) {
        pdate = str.split('-')
    } else {
        return false
    }
    const mm = parseInt(pdate[1], 10)
    const dd = parseInt(pdate[2], 10)
    const yy = parseInt(pdate[0], 10)

    let februaryDays = 28
    if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        februaryDays = 29
    }
    const ListofDays = [
        31,
        februaryDays,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ]
    if (dd > ListofDays[mm - 1]) {
        return false
    }
    return true
}

export const validationService = {
    isNumeric,
    isEmail,
    isDate,
    isEntered,
    isMinLength,
    isMaxLength,
    containsLowerCase,
    containsUpperCase,
    containsNumber,
}
